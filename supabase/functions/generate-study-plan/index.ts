import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Get user from auth header
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    console.log('Generating study plan for user:', user.id);

    // Fetch user's progress data
    const { data: progressData, error: progressError } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (progressError) {
      console.error('Error fetching progress:', progressError);
    }

    // Fetch existing tasks
    const { data: existingTasks, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (tasksError) {
      console.error('Error fetching tasks:', tasksError);
    }

    // Build context for AI
    const progressSummary = progressData && progressData.length > 0
      ? progressData.map(p => `${p.topic}: ${p.score}% (${p.attempts} attempts, ${p.time_spent}min)`).join('\n')
      : 'No progress data available yet';

    const taskHistory = existingTasks && existingTasks.length > 0
      ? existingTasks.map(t => `${t.title} (${t.type}, ${t.duration}min) - ${t.completed ? 'completed' : 'pending'}`).join('\n')
      : 'No previous tasks';

    // Call Lovable AI to generate personalized study plan
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an AI study planner for students. Create personalized study plans based on their progress and learning patterns. Generate 5 focused study tasks that are balanced between study, revision, and practice. Each task should be 25-45 minutes.`
          },
          {
            role: 'user',
            content: `Generate a personalized study plan for today based on this student data:

RECENT PROGRESS:
${progressSummary}

RECENT TASKS:
${taskHistory}

Create 5 new tasks focusing on:
1. Topics with lower scores (need more practice)
2. Balancing study, revision, and practice
3. Optimal learning duration (25-45 min per task)
4. Building on completed work

Return ONLY a JSON array in this exact format (no markdown, no explanation):
[
  {"title": "Task name", "duration": 30, "type": "study"},
  {"title": "Task name", "duration": 40, "type": "revision"},
  ...
]

Types must be exactly: "study", "revision", or "practice"`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`Lovable AI request failed: ${response.status}`);
    }

    const aiResponse = await response.json();
    const aiContent = aiResponse.choices[0].message.content.trim();
    
    console.log('AI Response:', aiContent);

    // Parse the AI response
    let tasks;
    try {
      // Remove markdown code blocks if present
      const cleanContent = aiContent.replace(/```json\n?|\n?```/g, '').trim();
      tasks = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      throw new Error('Invalid AI response format');
    }

    // Validate and insert tasks into database
    const tasksToInsert = tasks.map((task: any) => ({
      user_id: user.id,
      title: task.title,
      duration: task.duration,
      type: task.type,
      completed: false,
    }));

    const { data: insertedTasks, error: insertError } = await supabase
      .from('tasks')
      .insert(tasksToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting tasks:', insertError);
      throw insertError;
    }

    console.log('Successfully created study plan with', insertedTasks.length, 'tasks');

    return new Response(
      JSON.stringify({ 
        success: true, 
        tasks: insertedTasks,
        message: 'Study plan generated successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-study-plan:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});