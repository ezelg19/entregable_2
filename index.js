const fs = require('fs')

class Contenedor{
    constructor(rutaArchivo){
        this.rutaArchivo = rutaArchivo
    }

    async #readFile(){
        try{
            const contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            const contParse = JSON.parse(contenido)
            return contParse
        }
        catch(error){
            console.log(error)
        }
    }

    async save(obj){
        try{
            const contArchivo =  await this.getAll()
            if (contArchivo.length !== 0){
                await fs.promises.writeFile(this.rutaArchivo,JSON.stringify([...contArchivo, {...obj, id: contArchivo[contArchivo.length - 1].id + 1}], null, 2), 'utf-8')
            } else {            
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify( [ {...obj, id: 1} ]), 'utf-8')
            }
            console.log(contArchivo[contArchivo.length - 1].id + 1)
            return contArchivo[contArchivo.length - 1].id + 1
        }
        catch(error){
            console.log(error)
        }
    }
    async getById(num){
        const contArchivo =  await this.getAll()
        let busqueda = contArchivo.filter(obj => obj.id === num)
        return contArchivo[busqueda]
    }

    async getAll(){
        try{
            let contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            //const contParse = JSON.parse(contenido)
            //return contParse
            console.log(JSON.parse(contenido))
            return JSON.parse(contenido)
        }
        catch(error){
            console.log(error)
        }
    }
    async deleteById(number){
        const contArchivo =  await this.#readFile()
    }
    async deleteAll(){
        const contArchivo =  await this.#readFile()
    }
}

const contenedor = new Contenedor('./productos.txt')
const obj = {nombre:'pepito', trabajo:'obrero'}

console.log(`El nuevo objeto se guardo con el Id: ${contenedor.save(obj)} `)
//console.log(contenedor.getById(2))
contenedor.getAll()