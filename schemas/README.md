Cuando se construye un schema se genera una estructura y reglas de validación de los datos, para que estos sean analizados y validados previo a su captura.

<!--!            COMO USARLO👇            -->
primero requerimos el modulo con su direccion:
<br>
<font color="yellow">
    const usersSchema = require('../../schemas/usersSchema')
</font>
<br>

luego a este schema tenemos que pasarle el req.body del formulario. <strong>Nunca pasemos el req.body a la base de datos ya que puede ser facilmente hackeado con una inyeccion de SQL</strong>
<br>
<font color="33FFAC">
  const result = usersSchema.validateUser(req.body); <br>
  if (!result.success) { <br>
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  } <font color="red">Esto valida si fue la solicitud con exito o no</font>
</font>
<br>

Despues creamos una id UUID con la libreria crypto nativa de node y pasamos el resultado que tuvimos al procesar el req.body
<br>
<font color="F933FF">
  const userdb = {
    id: crypto.randomUUID(),
    ...result.data
  }
</font>
<br><br><br>

Hay 2 diferentes tipos de funcion para un Schema.<br>
<font color="black">
> validateUser <br>
> validatePartialUser
</font>

La primera la utilizaremos para operaciones con POST y PUT. La ultima con PATCH.