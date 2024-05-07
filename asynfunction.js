function cerrarSesion() {

    Swal.fire({
        title: "¡Alerta!",
        text: "Su sesión se cerrará en 10 segundos",
        icon: "warning"
      });

      setTimeout(() => {
        Swal.fire({
            title: "Mantener sesión",
            text: "¿Deseas continuar con la sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, mantener",
            timer: 4900,
            timerProgressBar: true,    
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Sesión mantenida",
                text: "La sesión seguira abierta",
                icon: "success"
              });
              clearTimeout(cerrarSesion);
            }
          });
      }, 5000);

   const cerrarSesion = setTimeout(() => {
        Swal.fire({
            title: "Sesión cerrada",
            text: "Su sesión a finalizado",
            icon: "error"
          });
      }, 10000);
};

const interval = setInterval(cerrarSesion(), 20000);