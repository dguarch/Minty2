let validar = () => {
    let _valid = true;
    let _formValues = {};

    $('form .errors').remove();

    $('#codigoCurso').each(function () {
        let validezNombre = this.validity;
        if (validezNombre.patternMismatch || validezNombre.valueMissing) {
            $('form #cheet').remove();
            $('#codigoCurso').after('<div class="errors"><i class="far fa-times-circle"></i> Ej. XXX 12345</div>');
            _valid = false;
        }
        _formValues[this.id] = this.value;
    });

    $('#nombreCurso').each(function () {
        let validezCurso = this.validity;
        if (validezCurso.patternMismatch || validezCurso.valueMissing) {
            $('#nombreCurso').after('<div class="errors"><i class="far fa-times-circle"></i> Nombre curso inv&aacute;lido.</div>');
            _valid = false;
        }
        _formValues[this.id] = this.value;
    });

    $('#profes').each(function () {
        if (this.value == 0) {
            $('#profes').after('<div class="errors"><i class="far fa-times-circle"></i> Selecciona un formador.</div>');
            _valid = false;
        }
        _formValues[this.id] = this.value;
    });

    $('#modulos').each(function () {
        if (this.value < 1 || this.value > 10) {
            $('#modulos').after('<div class="errors"><i class="far fa-times-circle"></i> Nº inválido.</div>');
            _valid = false;
        }
        _valid[this.id] = this.checkValidity();
        _formValues[this.id] = this.value;
    });

    $('#horas').each(function () {
        if (this.value < 20 || this.value > 200) {
            $('#horas').after('<div class="errors"><i class="far fa-times-circle"></i> Nº inválido.</div>');
            _valid = false;
        }
        _valid[this.id] = this.checkValidity();
        _formValues[this.id] = this.value;
    });

    return { valid: _valid, values: _formValues };
}
// MOKI
const enviarCurso = (dataSend) => {
	let cursodata=$('#formCurso').serialize();
	
    $.ajax({
        url: `/Mindty/coordinador`, // URL TRUE
        method: 'POST',
        accepts:"application/json",
        data: cursodata
    })
        .done(function (dataSend) {
            // Cuando hay exito
            if (dataSend) {
                $('#mensajes').html(`<div class="alert alert-success col-6" role="alert">  Los datos se han envíado correctamente!!!!!!
          </div>`);
            } else {
                $('#mensajes').html(`<div class="alert alert-danger" role="alert">
        No lo he podido guardar en el servidor, en un ratito lo intentaré de nuevo2.
      </div>`)
            };
        })
        .fail(function (err) {
            // Cuando hay error
            $('#mensajes').html(`<div class="alert alert-danger" role="alert">
        No he podido encontrar el servidor, en un ratito lo intentaré de nuevo.
      </div>`);
        });
    $('#formCurso').trigger("reset");
};

$('#enviar').click(function (evnt) {
    evnt.preventDefault();
    let formValido = validar();
    localStorage.setItem('infoCurso', JSON.stringify(formValido.values, ' '));
    if (formValido.valid) {
    	enviarCurso(formValido);
    }
});

$('#lupa').click(function (evnt) {
    evnt.preventDefault();
});

$('#modulosButton').click(function (evnt) {
	console.log('#modulosButton pulsado')
	$('#modulos').each(function () {
		if (this.value == 0 || this.value == null){
			this.value = 1;
		} else if (this.value > 10){
			this.value = 10;
		}
		let numeroModulo = 1;
		let numeroUnidad = 1;
		for (let i = 0; i < this.value; i++) {
			$('#modulosadd').after(`
				<div id="modulosarea">
					<div class="modulo">
					<!-- Campo Código curso con RegExp = ^[A-Z]{3}\s+[0-9]{5}$ (XXX 12345)$ -->
					<input type="text" class="form-control" pattern="^[A-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$" id="nombreModulo" placeholder="Nombre módulo" aria-label="Nombre módulo" name="modul${numeroModulo}" required value="Modulo ${numeroModulo} Nuevo">
					</div>
					<div class="row">
						<div class="col-1"></div>
							<div class="col-11 unidades">
								<!-- Campo Código curso con RegExp = ^[A-Z]{3}\s+[0-9]{5}$ (XXX 12345)$ -->
								<input type="text" class="form-control" pattern="^[A-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$" id="nombreUnidad" placeholder="Nombre unidad" aria-label="Nombre unidad" name="m${numeroModulo}u${numeroUnidad}" required value="Unidad ${numeroUnidad} - Modulo ${numeroModulo} Nuevo">
							</div>
						</div>
					<div class="row">
						<div class="col-1"></div>
							<div class="col-11 unidades">
								<!-- Campo Código curso con RegExp = ^[A-Z]{3}\s+[0-9]{5}$ (XXX 12345)$ -->
								<input type="text" class="form-control" pattern="^[A-Z]+(([,. -][a-zA-Z ])?[a-zA-Z]*)*$" id="nombreUnidad" placeholder="Nombre unidad" aria-label="Nombre unidad" name="m${numeroModulo}u${numeroUnidad+1}" required value="Unidad ${numeroUnidad+1} - Modulo ${numeroModulo} Nuevo">
							</div>
						</div>
					</div>
					</div>
				</div>
				`);
			numeroModulo++;
			console.log(this.value);
		}
        });
});