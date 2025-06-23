const AFP_PORCENTAJE = 0.10;
const ONP_PORCENTAJE = 0.13;
const ESSALUD = 0.09;
const GRATIFICACION = 1;
const CTS = 0.0833;
const VACACIONES = 0.0833;

let trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];

document.getElementById("formularioTrabajador").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const sueldo = parseFloat(document.getElementById("sueldo").value);
  const fondo = document.getElementById("fondo").value;

  if (!nombre || isNaN(sueldo)) {
    alert("Complete los campos correctamente.");
    return;
  }

  const nuevoTrabajador = {
    nombre,
    sueldoBruto: sueldo,
    usaOnp: fondo === "ONP",
    activo: true,
    id: Date.now()
  };

  const planilla = calcularPlanilla(nuevoTrabajador);
  trabajadores.push(planilla);
  localStorage.setItem("trabajadores", JSON.stringify(trabajadores));

  mostrarTrabajadores();
  this.reset();
});

function calcularPlanilla(trabajador) {
  const descuentoFondo = trabajador.usaOnp
    ? trabajador.sueldoBruto * ONP_PORCENTAJE
    : trabajador.sueldoBruto * AFP_PORCENTAJE;

  const descuentoSalud = trabajador.sueldoBruto * ESSALUD;
  const gratificacion = trabajador.sueldoBruto * GRATIFICACION;
  const cts = trabajador.sueldoBruto * CTS;
  const vacaciones = trabajador.sueldoBruto * VACACIONES;
  const sueldoNeto = trabajador.sueldoBruto - descuentoFondo;

  return {
    ...trabajador,
    descuentoFondo,
    descuentoSalud,
    gratificacion,
    cts,
    vacaciones,
    sueldoNeto
  };
}

function mostrarTrabajadores() {
  const tabla = document.getElementById("tablaTrabajadores");
  tabla.innerHTML = "";

  trabajadores.forEach(t => {
    if (t.activo) {
      tabla.innerHTML += `
        <tr>
          <td>${t.nombre}</td>
          <td>S/ ${t.sueldoBruto.toFixed(2)}</td>
          <td>${t.usaOnp ? "ONP" : "AFP"}</td>
          <td>S/ ${t.sueldoNeto.toFixed(2)}</td>
          <td>S/ ${t.gratificacion.toFixed(2)}</td>
          <td>S/ ${t.cts.toFixed(2)}</td>
          <td>S/ ${t.vacaciones.toFixed(2)}</td>
        </tr>
      `;
    }
  });
}

// Mostrar datos al cargar
mostrarTrabajadores();
