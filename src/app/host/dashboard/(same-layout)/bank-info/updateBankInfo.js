"use server"

const validateIFSC = async (ifsc) => {
  try {
    const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`)
    if (!response.ok) {
      throw new Error("Invalid IFSC code")
    }
    return await response.json()
  } catch (error) {
    throw new Error("Invalid IFSC code")
  }
}

export async function updateBankInfo(formData) {
  const accountNumber = formData.get("accountNumber")
  const ifscCode = formData.get("ifscCode")
  const accountHolderName = formData.get("accountHolderName")
  const bankName = formData.get("bankName")
  const confirmOwnership = formData.get("confirmOwnership")

  // General validation
  if (!accountNumber || accountNumber.length < 9 || accountNumber.length > 18) {
    return { error: "Account number should be between 9 and 18 digits." }
  }

  if (!ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
    return { error: "Invalid IFSC code format." }
  }

  if (!accountHolderName || accountHolderName.length < 2) {
    return { error: "Account holder name should be at least 2 characters long." }
  }

  if (!bankName || bankName.length < 2) {
    return { error: "Bank name should be at least 2 characters long." }
  }

  if (!confirmOwnership) {
    return { error: "Please confirm that the account belongs to you." }
  }

  try {
    // Validate IFSC code with Razorpay API
    const ifscData = await validateIFSC(ifscCode)

    // If IFSC is valid, proceed with updating bank info
    // TODO: Implement actual logic to update bank info in your database
    // This is where you'd typically make a database call or API request

    // Simulating a delay to mimic server processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: "Bank account information updated successfully!",
      bankDetails: ifscData,
    }
  } catch (error) {
    return { error: error.message }
  }
}

