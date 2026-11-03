const $ = (id) => document.getElementById(id);
let currentImproved = "";
let currentOriginal = "";

const categoryGuidance = {
  General: "Keep the response relevant, accurate, and easy to understand.",
  Education: "Teach the concept step by step, define important terms, and include a simple example.",
  Coding: "Provide a clear explanation, readable code, comments where useful, and explain how to run it.",
  Writing: "Use a clear structure, coherent paragraphs, and suitable language for the intended audience.",
  Business: "Focus on practical recommendations, measurable outcomes, and professional communication.",
  Creative: "Use engaging ideas, originality, and vivid but relevant details."
};

const toneGuidance = {
  "Clear and simple": "Use simple language and short, clear sentences.",
  Professional: "Use a polished, professional, and well-organised tone.",
  Creative: "Use an imaginative, engaging, and expressive tone.",
  Technical: "Use precise terminology and explain technical details accurately.",
  Friendly: "Use a warm, approachable, and conversational tone."
};

function buildImprovedPrompt(original, category, tone) {
  return `Act as a helpful ${category.toLowerCase()} expert.

TASK:
${original}

CONTEXT:
The response is intended for someone who wants a useful, relevant answer in the ${category.toLowerCase()} area.

INSTRUCTIONS:
- ${categoryGuidance[category]}
- ${toneGuidance[tone]}
- Organise the answer logically with headings or bullet points where appropriate.
- Avoid unnecessary repetition and unsupported claims.
- If important information is missing, state reasonable assumptions or ask a brief clarifying question.

OUTPUT FORMAT:
Present a well-structured response with an introduction, the main explanation, and a short conclusion or actionable next steps where relevant.

QUALITY CHECK:
Before finalising, check that the answer directly addresses the task, follows the requested tone, and is clear and complete.`;
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[ch]));
}

$("improveBtn").addEventListener("click", () => {
  const original = $("originalPrompt").value.trim();
  if (!original) {
    showToast("Please enter a basic prompt first.");
    $("originalPrompt").focus();
    return;
  }
  currentOriginal = original;
  currentImproved = buildImprovedPrompt(original, $("category").value, $("tone").value);
  $("improvedPrompt").textContent = currentImproved;
  $("emptyState").classList.add("hidden");
  $("outputArea").classList.remove("hidden");
  $("outputStatus").textContent = "READY";
});

$("copyBtn").addEventListener("click", async () => {
  if (!currentImproved) return;
  try {
    await navigator.clipboard.writeText(currentImproved);
    showToast("Improved prompt copied!");
  } catch {
    showToast("Copy is unavailable in this browser. Select and copy the text.");
  }
});

async function apiRequest(action, options = {}) {
  const response = await fetch(`api.php?action=${action}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || "Request failed");
  return data;
}

$("saveBtn").addEventListener("click", async () => {
  if (!currentImproved) return;
  try {
    await apiRequest("save", {
      method: "POST",
      body: JSON.stringify({
        original_prompt: currentOriginal,
        improved_prompt: currentImproved,
        category: $("category").value,
        tone: $("tone").value
      })
    });
    showToast("Prompt saved to database!");
    await loadHistory();
  } catch (error) {
    showToast(error.message + " Check your PHP/MySQL setup.");
  }
});

async function loadHistory() {
  try {
    const data = await apiRequest("list");
    $("savedCount").textContent = data.prompts.length;
    if (!data.prompts.length) {
      $("historyList").innerHTML = '<div class="empty-history">No saved prompts yet. Create and save your first prompt.</div>';
      return;
    }
    $("historyList").innerHTML = data.prompts.map(item => `
      <article class="history-card">
        <div class="history-meta"><span>${escapeHTML(item.category)} · ${escapeHTML(item.tone)} · ${escapeHTML(item.created_at)}</span>
        <button class="delete-btn" data-delete="${Number(item.id)}">Delete</button></div>
        <strong>Original prompt</strong><p>${escapeHTML(item.original_prompt)}</p>
        <strong>Improved prompt</strong><p>${escapeHTML(item.improved_prompt)}</p>
      </article>`).join("");
    document.querySelectorAll("[data-delete]").forEach(button => {
      button.addEventListener("click", async () => {
        try {
          await apiRequest("delete", { method: "POST", body: JSON.stringify({ id: Number(button.dataset.delete) }) });
          showToast("Prompt deleted.");
          await loadHistory();
        } catch (error) { showToast(error.message); }
      });
    });
  } catch (error) {
    $("savedCount").textContent = "—";
    $("historyList").innerHTML = '<div class="empty-history">Could not load history. Start Apache and MySQL, then import database.sql.</div>';
  }
}

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const history = button.dataset.view === "history";
    $("builderView").classList.toggle("hidden", history);
    $("historyView").classList.toggle("hidden", !history);
    if (history) loadHistory();
  });
});

loadHistory();
