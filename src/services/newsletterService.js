const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

export const subscribeToNewsletter = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      return response;
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      throw new Error("Network error. Please try again later.");
    }
  };
  