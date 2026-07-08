const API_BASE = "http://localhost:5000/api/jobs";

async function handleResponse(res) {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `Request failed with status ${res.status}`);
  }
  // DELETE returns no content
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchJobs(statusFilter) {
  const url = statusFilter ? `${API_BASE}?status=${statusFilter}` : API_BASE;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function createJob(job) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return handleResponse(res);
}

export async function updateJob(id, job) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return handleResponse(res);
}

export async function deleteJob(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  return handleResponse(res);
}
