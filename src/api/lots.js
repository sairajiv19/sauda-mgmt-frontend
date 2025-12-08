const BASE_URL = "http://localhost:8000";

export async function fetchDealLots(dealId) {
  try {
    const response = await fetch(`${BASE_URL}/deals/read/${dealId}/lot/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Lots fetched:", data.response);
    return data.response;
  } catch (error) {
    console.error("Failed to fetch lots:", error);
    alert(`Error fetching lots: ${error.message}`);
    throw error;
  }
}

export async function fetchLotDetails(dealId, lotId) {
  try {
    const response = await fetch(`${BASE_URL}/deals/read/${dealId}/lot/${lotId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Lot details fetched:", data.response);
    return data.response;
  } catch (error) {
    console.error("Failed to fetch lot details:", error);
    alert(`Error fetching lot details: ${error.message}`);
    throw error;
  }
}

export async function updateLot(dealId, lotId, updateData) {
  try {
    const response = await fetch(
      `${BASE_URL}/deals/update/${dealId}/lots/${lotId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update lot:", error);
    throw error;
  }
}

export async function batchUpdateLots(dealId, batchUpdateData) {
  try {
    const response = await fetch(
      `${BASE_URL}/deals/update/${dealId}/lots/batch-update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batchUpdateData),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to batch update lots:", error);
    throw error;
  }
}

export async function batchDeliveryUpdate(dealId, deliveryUpdates) {
  try {
    // Explicitly create the payload object
    const payload = {
      data: deliveryUpdates
    };
    
    console.log("Payload being sent:", JSON.stringify(payload)); // Verify in console
    
    const response = await fetch(`${BASE_URL}/deals/update/lots/update-delivery-details`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update delivery data:", error);
    throw error;
  }
}

export async function batchCostEstimation(brokerId, dealId, lotIds, costData) {
  try {
    const payload = {
      public_lot_ids: lotIds,
      broker_id: brokerId,
      update: {
      qi_expense: parseFloat(costData.qi_expense) || 0,
      lot_dalali_expense: parseFloat(costData.lot_dalali_expense) || 0,
      other_expenses: parseFloat(costData.other_expenses) || 0,
      brokerage: parseFloat(costData.brokerage) || 3
      }
    };

    const response = await fetch(`${BASE_URL}/deals/${dealId}/lots/cost-estimation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to estimate cost:", error);
    throw error;
  }
}

