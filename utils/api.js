export const fetchData = async (problemId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/flask/data/${problemId}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Expecting JSON response
    console.log(data); // Log the data to verify
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
