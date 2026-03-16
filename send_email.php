<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$company = isset($_POST['company']) ? trim($_POST['company']) : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Required fields are missing']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Email configuration
$to = 'usamasaleem14@gmail.com';
$subject = 'Contact Form Submission from ' . $name;

// Create email body
$emailBody = "New contact form submission:\n\n";
$emailBody .= "Name: " . $name . "\n";
$emailBody .= "Email: " . $email . "\n";
$emailBody .= "Phone: " . ($phone ? $phone : 'Not provided') . "\n";
$emailBody .= "Company: " . ($company ? $company : 'Not provided') . "\n";
$emailBody .= "Service Interested In: " . ($service ? $service : 'Not specified') . "\n\n";
$emailBody .= "Message:\n" . $message . "\n\n";
$emailBody .= "---\n";
$emailBody .= "Sent from Japan Resource Group website contact form\n";
$emailBody .= "Date: " . date('Y-m-d H:i:s');

// Email headers
$headers = array(
    'From: ' . $email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
);

// Send email
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
