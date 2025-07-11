document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaPlanilla");
  const trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];

  const AFP_PORCENTAJE = 0.10;
  const ONP_PORCENTAJE = 0.13;
  const ESSALUD_PORCENTAJE = 0.09;
  const GRATIFICACION_PORCENTAJE = 1;
  const CTS_PORCENTAJE = 0.0833;
  const VACACIONES_PORCENTAJE = 0.0833;

  function calcularPlanilla(trabajador) {
    const sueldoBruto = parseFloat(trabajador.sueldo);

    const descuentoFondo = trabajador.fondo === "ONP"
      ? sueldoBruto * ONP_PORCENTAJE
      : sueldoBruto * AFP_PORCENTAJE;

    const essalud = sueldoBruto * ESSALUD_PORCENTAJE;
    const gratificacion = sueldoBruto * GRATIFICACION_PORCENTAJE;
    const cts = sueldoBruto * CTS_PORCENTAJE;
    const vacaciones = sueldoBruto * VACACIONES_PORCENTAJE;
    const sueldoNeto = sueldoBruto - descuentoFondo;

    return {
      ...trabajador,
      descuentoFondo,
      essalud,
      gratificacion,
      cts,
      vacaciones,
      sueldoNeto
    };
  }

  function mostrarPlanilla() {
    tabla.innerHTML = "";
    trabajadores.forEach(trabajador => {
      const datos = calcularPlanilla(trabajador);

      const fila = document.createElement("tr");
      fila.classList.add("animate__animated", "animate__fadeIn");

      fila.innerHTML = `
        <td>${datos.nombre}</td>
        <td>${datos.apellidos}</td>
        <td>S/ ${parseFloat(datos.sueldo).toFixed(2)}</td>
        <td>${datos.fondo}</td>
        <td>S/ ${datos.descuentoFondo.toFixed(2)}</td>
        <td>S/ ${datos.essalud.toFixed(2)}</td>
        <td>S/ ${datos.gratificacion.toFixed(2)}</td>
        <td>S/ ${datos.cts.toFixed(2)}</td>
        <td>S/ ${datos.vacaciones.toFixed(2)}</td>
        <td>S/ ${datos.sueldoNeto.toFixed(2)}</td>
      `;

      tabla.appendChild(fila);
    });
  }

  mostrarPlanilla();
});
