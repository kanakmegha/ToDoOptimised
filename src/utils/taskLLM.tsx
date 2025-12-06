
export async function generateSubtasks(task: string) {
    const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
  
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
          {
            role: "user",
            content: `Break this task into 30 short, simple subtasks. Output only bullet points.\nTask: "${task}"`,
          },
        ],
      }),
    });
  
    const data = await response.json();
  
    const text = data.choices?.[0]?.message?.content || "";
  
    // Convert bullet points → array
    return text
      .split("\n")
      .map((line: string) => line.replace(/^[-•\d.]+\s*/, "").trim())
      .filter(Boolean);
  }
  