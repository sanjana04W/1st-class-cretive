import emailjs from "emailjs-com";

export interface SendVerificationEmailParams {
  toEmail: string;
  toName: string;
  code: string;
  orderTotal?: number | string;
  itemsSummary?: string;
  orderNumber?: string;
}

/**
 * Sends a 6-digit verification code to the customer's email address using EmailJS.
 * Maps to all common EmailJS variable naming patterns to ensure the code and order
 * summary display properly regardless of the template's field names.
 */
export async function sendVerificationEmail({
  toEmail,
  toName,
  code,
  orderTotal,
  itemsSummary,
  orderNumber,
}: SendVerificationEmailParams): Promise<{ success: boolean; error?: string }> {
  const serviceId = (process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_bubyu7f").trim();
  const templateId = (process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_19c916x").trim();
  const publicKey = (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "LhFCNuXG5Ie0lkAig").trim();

  // Log code to browser console for immediate testing and verification
  console.log(`🔐 [1st Class Creative] Order Verification Code: ${code} for ${toEmail}`);

  if (!serviceId || !templateId || !publicKey) {
    const errorMsg = "EmailJS service credentials missing.";
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }

  const recipientName = toName || "Valued Customer";
  const totalDisplay = orderTotal ? (typeof orderTotal === "number" ? `LKR ${orderTotal.toLocaleString()}` : String(orderTotal)) : "";
  const itemsDisplay = itemsSummary || "Handcrafted Creation";
  const orderNumDisplay = orderNumber || "";

  // Comprehensive dictionary covering all possible EmailJS template variables
  const templateParams: Record<string, string> = {
    // Recipient & sender
    to_name: recipientName,
    name: recipientName,
    customer_name: recipientName,
    to_email: toEmail,
    email: toEmail,
    user_email: toEmail,
    reply_to: toEmail,
    subject: "Your 1st Class Creative Order Verification Code",

    // The 6-digit verification code in all common casing & naming variants
    otp_code: code,
    otpCode: code,
    OtpCode: code,
    OTP_CODE: code,
    OTP: code,
    Otp: code,
    otp: code,
    code: code,
    Code: code,
    CODE: code,
    verification_code: code,
    verificationCode: code,
    VerificationCode: code,
    VERIFICATION_CODE: code,
    verify_code: code,
    verifyCode: code,
    VerifyCode: code,
    VERIFY_CODE: code,
    verification: code,
    Verification: code,
    verify: code,
    v_code: code,
    vcode: code,
    passcode: code,
    Passcode: code,
    PASSCODE: code,
    pin: code,
    PIN: code,
    pin_code: code,
    pinCode: code,
    PinCode: code,
    token: code,
    TOKEN: code,
    security_code: code,
    securityCode: code,
    SecurityCode: code,
    confirmation_code: code,
    confirmationCode: code,
    ConfirmationCode: code,
    auth_code: code,
    authCode: code,
    AuthCode: code,
    order_code: code,
    orderCode: code,
    user_code: code,
    six_digit_code: code,
    sixDigitCode: code,
    six_digits: code,
    digit_code: code,
    number: code,
    digits: code,
    val: code,
    value: code,
    secret: code,
    secret_code: code,
    one_time_password: code,
    one_time_code: code,

    // Order item, title, amount, and summary variations (for "confirm your order of [X] is: [OTP]")
    order_of: itemsDisplay,
    orderOf: itemsDisplay,
    order: itemsDisplay,
    Order: itemsDisplay,
    order_summary: itemsDisplay,
    orderSummary: itemsDisplay,
    order_details: itemsDisplay,
    orderDetails: itemsDisplay,
    order_description: itemsDisplay,
    orderDescription: itemsDisplay,
    order_item: itemsDisplay,
    orderItem: itemsDisplay,
    order_items: itemsDisplay,
    orderItems: itemsDisplay,
    items: itemsDisplay,
    Items: itemsDisplay,
    item_name: itemsDisplay,
    itemName: itemsDisplay,
    item_title: itemsDisplay,
    itemTitle: itemsDisplay,
    item: itemsDisplay,
    product: itemsDisplay,
    product_name: itemsDisplay,
    productName: itemsDisplay,
    products: itemsDisplay,
    package: itemsDisplay,
    package_name: itemsDisplay,
    packageName: itemsDisplay,
    title: itemsDisplay,
    description: itemsDisplay,
    summary: itemsDisplay,
    cart: itemsDisplay,
    cart_items: itemsDisplay,

    // Pricing & order number variations
    total: totalDisplay || itemsDisplay,
    Total: totalDisplay || itemsDisplay,
    order_total: totalDisplay || itemsDisplay,
    orderTotal: totalDisplay || itemsDisplay,
    ORDER_TOTAL: totalDisplay || itemsDisplay,
    amount: totalDisplay || itemsDisplay,
    Amount: totalDisplay || itemsDisplay,
    order_amount: totalDisplay || itemsDisplay,
    orderAmount: totalDisplay || itemsDisplay,
    price: totalDisplay || itemsDisplay,
    Price: totalDisplay || itemsDisplay,
    cost: totalDisplay || itemsDisplay,
    order_id: orderNumDisplay,
    orderId: orderNumDisplay,
    order_number: orderNumDisplay,
    orderNumber: orderNumDisplay,

    // Full message fallback
    message: `Your 1st Class Creative verification code is: ${code}. Please enter this 6-digit code on the checkout page to confirm your order.`,
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("EmailJS verification code sent successfully:", response.status, response.text);
    return { success: true };
  } catch (err: any) {
    console.error("EmailJS send failed:", err);
    return {
      success: false,
      error: err?.text || err?.message || "Failed to send verification email.",
    };
  }
}
