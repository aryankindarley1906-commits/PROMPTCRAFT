<?php
session_start();
header("Content-Type: application/json; charset=utf-8");
header("X-Content-Type-Options: nosniff");

if (!isset($_SESSION["promptcraft_token"])) {
    $_SESSION["promptcraft_token"] = bin2hex(random_bytes(24));
}
$token = $_SESSION["promptcraft_token"];

require_once "config.php";

function respond($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

$action = $_GET["action"] ?? "";

if ($action === "list" && $_SERVER["REQUEST_METHOD"] === "GET") {
    $stmt = $pdo->prepare("SELECT id, original_prompt, improved_prompt, category, tone, DATE_FORMAT(created_at, '%d %b %Y, %h:%i %p') AS created_at FROM prompts WHERE session_token = ? ORDER BY id DESC");
    $stmt->execute([$token]);
    respond(["success" => true, "prompts" => $stmt->fetchAll()]);
}

$input = json_decode(file_get_contents("php://input"), true) ?? [];

if ($action === "save" && $_SERVER["REQUEST_METHOD"] === "POST") {
    $original = trim($input["original_prompt"] ?? "");
    $improved = trim($input["improved_prompt"] ?? "");
    $category = trim($input["category"] ?? "General");
    $tone = trim($input["tone"] ?? "Clear and simple");

    if ($original === "" || $improved === "") respond(["success" => false, "message" => "Both prompt fields are required."], 400);
    if (strlen($original) > 5000 || strlen($improved) > 15000) respond(["success" => false, "message" => "Prompt is too long."], 400);

    $stmt = $pdo->prepare("INSERT INTO prompts (session_token, original_prompt, improved_prompt, category, tone) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$token, $original, $improved, $category, $tone]);
    respond(["success" => true, "id" => $pdo->lastInsertId()]);
}

if ($action === "delete" && $_SERVER["REQUEST_METHOD"] === "POST") {
    $id = filter_var($input["id"] ?? null, FILTER_VALIDATE_INT);
    if (!$id) respond(["success" => false, "message" => "Invalid prompt ID."], 400);
    $stmt = $pdo->prepare("DELETE FROM prompts WHERE id = ? AND session_token = ?");
    $stmt->execute([$id, $token]);
    respond(["success" => true]);
}

respond(["success" => false, "message" => "Unknown action."], 404);
