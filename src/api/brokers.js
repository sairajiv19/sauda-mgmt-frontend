export async function fetchAllBrokers() {
  try {
    const response = await fetch("http://localhost:8000/brokers/read/all");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Failed to fetch brokers:", error);
    alert(`Error fetching brokers: ${error.message}`);
    throw error;
  }
}

export async function createBroker(brokerData) {
  try {
    const response = await fetch("http://localhost:8000/brokers/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brokerData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create broker:", error);
    throw error;
  }
}

export async function fetchBrokerDeals(brokerId) {
  try {
    const response = await fetch(`http://localhost:8000/brokers/read/${brokerId}/show-deals`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create broker:", error);
    throw error;
  }
}

export async function fetchBrokerLedger(brokerId) {
  try {
    const response = await fetch(`http://localhost:8000/brokers/read/${brokerId}/ledger`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch broker ledger:", error);
    throw error;
  }
}

export async function createBrokerLedgerEntry(brokerId, entryData) {
  const response = await fetch(`http://localhost:8000/brokers/${brokerId}/ledger-create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create ledger entry");
  }

  return response.json();
}