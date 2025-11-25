export async function createShipment(dealId, lotId, shipmentData) {
  try {
    const response = await fetch(
      `http://localhost:8000/deals/${dealId}/lots/${lotId}/shipment/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shipmentData),
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to create shipment:", error);
    throw error;
  }
}

export async function batchCreateShipments(dealId, batchData) {
  try {
    const response = await fetch(
      `http://localhost:8000/deals/${dealId}/lots/shipment/create-batch`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batchData),
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to batch create shipments:", error);
    throw error;
  }
}

export async function getShipment(dealId, lotId, shipmentId) {
  try {
    const response = await fetch(
      `http://localhost:8000/deals/${dealId}/lots/${lotId}/shipment/${shipmentId}/read`,
      { method: "POST", headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to get shipment:", error);
    throw error;
  }
}

export async function getLotShipments(dealId, lotId) {
  try {
    const response = await fetch(
      `http://localhost:8000/deals/${dealId}/lots/${lotId}/shipment/read-lot`,
      { method: "POST", headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to get lot shipments:", error);
    throw error;
  }
}

export async function getDealShipments(dealId) {
  try {
    const response = await fetch(
      `http://localhost:8000/deals/${dealId}/lots/shipment/read-deal`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to get deal shipments:", error);
    throw error;
  }
}

export async function updateShipment(shipmentId, updateData) {
  try {
    const response = await fetch(
      `http://localhost:8000/deals/lots/shipment/${shipmentId}/update`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to update shipment:", error);
    throw error;
  }
}

export async function batchUpdateShipments(batchData) {
  try {
    const response = await fetch(
      `http://localhost:8000/deals/lots/shipment/update/batch-update`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batchData),
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to batch update shipments:", error);
    throw error;
  }
}

export async function deleteShipment(dealId, lotId, shipmentId) {
  try {
    const response = await fetch(
      `http://localhost:8000/deals/${dealId}/lots/${lotId}/shipment/${shipmentId}/delete`,
      { method: "DELETE", headers: { "Content-Type": "application/json" } }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to delete shipment:", error);
    throw error;
  }
}
