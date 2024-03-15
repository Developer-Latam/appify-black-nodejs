





router.post('/signup-subusuario',async(req,res)=>{
  
    const { idUsuario,nombre,apellido,email,celular,fecha_de_nacimiento,cargo, permisos } = req.body;
    //console.log de permisos
    // {
    //     idUsuario: '7',
    //     nombre: 'Uusario',
    //     apellido: 'ParaPEPE',
    //     email: 'pepesubuser@example.com',
    //     celular: '123456677',
    //     fecha_de_nacimiento: '2024-03-15',
    //     cargo: 'Vendedor',
    //     permisos: [
    //       {
    //         categoria: 'Comercial',
    //         subcategoria: 'Proyecto',
    //         id: 1,
    //         inactivo: 0,
    //         ver: 0,
    //         administrar: 1,
    //         todo: 1,
    //         propietario: 0
    //       },
    //       {
    //         categoria: 'Comercial',
    //         subcategoria: 'Clientes',
    //         id: 2,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: 1,
    //         propietario: 0
    //       },
    //       {
    //         categoria: 'Comercial',
    //         subcategoria: 'Satisfaccion del Cliente',
    //         id: 3,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Operaciones',
    //         subcategoria: 'Ordenes de Trabajo',
    //         id: 4,
    //         inactivo: 0,
    //         ver: 1,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Operaciones',
    //         subcategoria: 'Tablero de Produccion',
    //         id: 5,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Operaciones',
    //         subcategoria: 'Ordenes de Compra',
    //         id: 6,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Operaciones',
    //         subcategoria: 'Inventario',
    //         id: 7,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Calendario',
    //         subcategoria: 'Agendamiento',
    //         id: 8,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Administracion',
    //         subcategoria: 'Ventas',
    //         id: 9,
    //         inactivo: 0,
    //         ver: 1,
    //         administrar: 0,
    //         todo: 1,
    //         propietario: 0
    //       },
    //       {
    //         categoria: 'Administracion',
    //         subcategoria: 'Compras',
    //         id: 10,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Administracion',
    //         subcategoria: 'Registro de Cobros o Pagos',
    //         id: 11,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Administracion',
    //         subcategoria: 'Cuentas',
    //         id: 12,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Administracion',
    //         subcategoria: 'Resultados y Balance',
    //         id: 13,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Otros',
    //         subcategoria: 'Usuarios',
    //         id: 14,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Otros',
    //         subcategoria: 'Productos',
    //         id: 15,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Otros',
    //         subcategoria: 'Servicios',
    //         id: 16,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Otros',
    //         subcategoria: 'Proveedores',
    //         id: 17,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       },
    //       {
    //         categoria: 'Otros',
    //         subcategoria: 'Configuraciones',
    //         id: 18,
    //         inactivo: 1,
    //         ver: 0,
    //         administrar: 0,
    //         todo: null,
    //         propietario: null
    //       }
    //     ]
    //   }
    try{
      const [subUser] = await connectionDB.execute('SELECT * FROM subusuarios WHERE email = ?',[email]);
  
      if(subUser.length === 1){
        
        return res.status(400).json({ok:false,message:'el mail ya existe'});
      
      }else{
  
        const idSubUsuario = uuidv4();
  
        try{
          
          await connectionDB.execute('INSERT INTO subusuarios (id,user,nombre,apellido,email,celular,fecha_de_nacimiento,cargo,ref_superusuario,checkeado) VALUES (?,?,?,?,?,?,?,?,?,?)',[idSubUsuario,idUsuario,nombre,apellido,email,celular,fecha_de_nacimiento,cargo,0,0]);
          
  
          for (const permiso of permisos){
            try{
              await connectionDB.execute('INSERT INTO permisos_de_usuario (idPermiso,user,inactivo,ver,administrar,todo,propietario) VALUES (?,?,?,?,?,?,?)',[permiso.id, idSubUsuario ,permiso.inactivo , permiso.ver ,permiso.administrar ,permiso.todo , permiso.propietario])
              console.log('ingresado')
            }catch(err){
              console.log('error en el ingreso')
              console.log(err)
            }
  
          }
  
          console.log('subusuario ingresado')
  
          return res.status(200).json({ok:true,message:'subusuario creado'});
  
        }catch(err){
          console.log(err)
          return res.status(400).json({ok:false})
        
        }
      }
    }catch(err){
      console.log(err)
      return res.status(400).json({ok:false})
    }
  })