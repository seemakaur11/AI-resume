// app/api/suggest/route.js
export async function POST(req) {
  const { text } = await req.json();

  if (!text) {
    return new Response(JSON.stringify({ error: "No text provided" }), {
      status: 400,
    });
  }


  try {
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // ✅ Free valid model
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant that reviews resumes...",
          },
          {
            role: "user",
            content: `Here is the resume text:\n\n${text}\n\nWhat are your suggestions to improve it?`,
          },
        ],
      }),
    });

    const json = await aiRes.json();

    if (json.choices && json.choices.length > 0) {
      return new Response(
        JSON.stringify({ suggestion: json.choices[0].message.content }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "No suggestions generated." }),
        {
          status: 500,
        }
      );
    }
  } catch (err) {
    console.error("AI Error:", err);
    return new Response(JSON.stringify({ error: "AI request failed." }), {
      status: 500,
    });
  }
}
