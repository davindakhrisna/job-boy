const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing personality with Gemini AI...');

    const prompt = `You are an expert career psychologist specializing in personality assessment and ethical career guidance.

IMPORTANT: Respond entirely in Indonesian language (Bahasa Indonesia). All descriptions, explanations, and recommendations must be in Indonesian.

Based on the following personality assessment responses, provide a comprehensive analysis:

${answers.map((a: any, i: number) => `Question ${i + 1}: ${a.question}\nAnswer: ${a.answer}`).join('\n\n')}

Please provide a detailed JSON response with the following structure:
{
  "personalityProfile": {
    "summary": "A 2-3 sentence overview of their core personality",
    "traits": [
      { "name": "Trait name", "description": "Brief description", "strength": "high/medium/low" }
    ],
    "strengths": ["List 4-5 key strengths"],
    "workStyle": "Description of their preferred work environment and approach"
  },
  "careerRecommendations": [
    {
      "title": "Job Title",
      "match": 95,
      "description": "Brief role description",
      "whyGoodFit": "Explanation of personality alignment",
      "decencyFactors": ["Ethical aspect 1", "Ethical aspect 2", "Ethical aspect 3"],
      "growthAreas": "How this role supports personal development"
    }
  ]
}

Focus on careers that:
- Are ethically sound and socially valuable
- Respect human dignity and contribute positively to society
- Align with the person's values and personality traits
- Offer meaningful work and personal growth
- Avoid exploitative or harmful practices

Provide 5-7 career recommendations ranked by match percentage.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze personality' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Gemini response received');

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      console.error('No content in Gemini response');
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract JSON from markdown code blocks if present
    let jsonText = content;
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    const analysis = JSON.parse(jsonText);

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-personality function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
