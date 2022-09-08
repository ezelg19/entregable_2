const fs = require("fs");

class Contenedor {
         constructor(rutaArchivo) {
            this.rutaArchivo = rutaArchivo;
         }

         async #readFile() {
            try {
                const contenido = await fs.promises.readFile(this.rutaArchivo, "utf-8");
                const contenidoParse = JSON.parse(contenido)
                return contenidoParse
                
            } catch (error) {
                console.error('Error leer archivo: ' + error)
            }    
         }

         async save(obj) {
            const contenidoArchivo = await this.#readFile()

            if ( contenidoArchivo.length !== 0 ) {
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}], null, 2) )
                console.log('Objeto guardado en la Base de Datos!')
            } else {
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([ {...obj, id: 1}]), 'utf-8')
                console.log('Objeto guardado en la Base de Datos!')
            }

         }

         async getById(id) {
            const contenidoArchivo = await this.#readFile()
                
                const producto = contenidoArchivo.filter(item => item.id === id)
                    if (producto.length > 0) {
                        console.log('Objeto encontrado: ' + JSON.stringify(producto, true, 2));
                    } else {
                        console.log('El id del producto ingresado no existe en la Base de Datos')
                    }
         }

         async getAll() {
            const contenidoArchivo = await this.#readFile()
            console.log(contenidoArchivo)
         }

         async deleteById(id) {
            const contenidoArchivo = await this.#readFile()
            
            const productosSinBorrar = contenidoArchivo.filter(item => item.id !== id)
            const productoABorrar = contenidoArchivo.filter(item => item.id === id)
            
                if ( productoABorrar.length > 0) {
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(productosSinBorrar, null, 2));
                    console.log(`Objeto ${JSON.stringify(productoABorrar, null, 2)} \nEliminado de la Base de Datos!!\n`)
                } else {
                    console.log('El id del producto ingresado no existe en la Base de Datos')
                }
        }

         async deleteAll() {
            const contenidoArchivo = await this.#readFile()
            if( contenidoArchivo.length > 0 ) {
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 2), 'utf-8')
                console.log('La Base de Datos a sido eliminada')
            } else {
                console.log('La Base de Datos está vacía!')
            }

         }
}         

const contenedor = new Contenedor('./productos.txt')

const obj = {nombre:'pepito', trabajo:'obrero'}

//contenedor.save(obj)

contenedor.getAll()

//contenedor.getById(4)

//contenedor.deleteById(3)

//contenedor.deleteAll()