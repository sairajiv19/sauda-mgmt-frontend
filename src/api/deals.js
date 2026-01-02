const BASE_URL = "http://localhost:8000";

export async function fetchAllDeals() {
  try {
    const res = await fetch(`${BASE_URL}/deals/read/all`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();

    return data.response || [];
  } catch (err) {
    alert(`Error fetching deals: ${err.message}`); // optional
    console.error("❌ Error fetching deals:", err);
    return [];
  }
}

export async function updateDealStatus(publicId, status) {
  try {
    const response = await fetch(`${BASE_URL}/deals/update/${publicId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error("Failed to update status");
    return response.json();
  } catch (err) {
    alert(`Error fetching deals: ${err.message}`); // optional
    console.error("❌ Error fetching deals:", err);
    return [];
  }
}


export async function createSauda(saudaData) {
  try {
    const response = await fetch(`${BASE_URL}/deals/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saudaData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create sauda:", error);
    throw error;
  }
}

export async function deleteDeal(dealId) {
  try {
    const response = await fetch(
      `${BASE_URL}/deals/delete/${dealId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to delete deal:", error);
    throw error;
  }
}
