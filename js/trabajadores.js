document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.getElementById("tablaTrabajadores");
  const formulario = document.getElementById("formularioTrabajador");

  let trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];

  if (trabajadores.length === 0) {
    try {
      const response = await fetch("data/trabajadores.json"); // Asegúrate de usar Live Server o un servidor local
      if (!response.ok) throw new Error(`Error al cargar trabajadores.json: ${response.status}`);
      const data = await response.json();
      trabajadores = data;
      localStorage.setItem("trabajadores", JSON.stringify(trabajadores));
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los datos iniciales. Usa Live Server.", "error");
      console.error(error);
    }
  }

  function mostrarTrabajadores() {
    tabla.innerHTML = "";
    trabajadores.forEach(t => {
      const fila = document.createElement("tr");
      fila.classList.add("animate__animated", "animate__fadeIn");
      fila.innerHTML = `
        <td>${t.nombre}</td>
        <td>${t.apellidos}</td>
        <td>${t.direccion}</td>
        <td>${t.pais}</td>
        <td>${t.dni}</td>
        <td>S/ ${parseFloat(t.sueldo).toFixed(2)}</td>
        <td>${t.fondo}</td>
      `;
      tabla.appendChild(fila);
    });
  }

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const pais = document.getElementById("pais").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const sueldo = document.getElementById("sueldo").value.trim();
    const fondo = document.getElementById("fondo").value;

    try {
      if (!nombre || /\d/.test(nombre)) throw new Error("El nombre es inválido.");
      if (!apellidos || /\d/.test(apellidos)) throw new Error("Los apellidos son inválidos.");
      if (!direccion) throw new Error("La dirección no puede estar vacía.");
      if (!pais || /\d/.test(pais)) throw new Error("El país es inválido.");
      if (!dni || !/^\d{8}$/.test(dni)) throw new Error("El DNI debe tener 8 dígitos.");
      if (!sueldo || isNaN(sueldo) || sueldo <= 0) throw new Error("El sueldo debe ser un número válido mayor a cero.");
      if (!fondo) throw new Error("Debes seleccionar un fondo de pensión.");

      const nuevoTrabajador = {
        id: Date.now(),
        nombre,
        apellidos,
        direccion,
        pais,
        dni,
        sueldo: parseFloat(sueldo),
        fondo
      };

      trabajadores.push(nuevoTrabajador);
      localStorage.setItem("trabajadores", JSON.stringify(trabajadores));

      mostrarTrabajadores();
      Swal.fire({
        icon: "success",
        title: "¡Registrado!",
        text: "Se registró exitosamente al empleado.",
        timer: 1500,
        showConfirmButton: false
      });

      formulario.reset();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  });
  mostrarTrabajadores();
});
