import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class EmpresaDb{
    @PrimaryGeneratedColumn('increment')
    empresaId: number

    @Column()
    codeEmpresa: string

    @Column({
        type: 'bool',
        default: true
    })
    state: boolean
        
}