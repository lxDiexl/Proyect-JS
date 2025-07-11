document.addEventListener("DOMContentLoaded", () => {
  fetch("components/navbar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar navbar: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById("navbarContainer").innerHTML = html;
      inicializarModoOscuro(); // Ejecutar después de insertar el navbar
    })
    .catch(error => {
      console.error(error);
    });
});

function inicializarModoOscuro() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return; // Evita errores si el navbar no se carga correctamente

  if (localStorage.getItem('modoOscuro') === 'true') {
    activarModoOscuro();
    toggle.checked = true;
  }
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      activarModoOscuro();
      localStorage.setItem('modoOscuro', 'true');
    } else {
      desactivarModoOscuro();
      localStorage.setItem('modoOscuro', 'false');
    }
  });

  function activarModoOscuro() {
    document.body.classList.add('bg-dark', 'text-white');
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.add('bg-dark', 'text-white');
  }

  function desactivarModoOscuro() {
    document.body.classList.remove('bg-dark', 'text-white');
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('bg-dark', 'text-white');
  }
}
