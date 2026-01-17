// Cargar datos del perfil desde localStorage
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("nombre").textContent = localStorage.getItem("nombre") || "—";
    document.getElementById("correo").textContent = localStorage.getItem("correo") || "—";
    document.getElementById("rol").textContent = localStorage.getItem("rol") || "—";
});