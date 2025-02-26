export async function fetchCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?field=name"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const data = await response.json();
    return data
      .map((country) => ({
        name: country.name.common,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error(error);
    return [];
  }
}
