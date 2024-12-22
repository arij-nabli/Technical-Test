import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Task {
  // La colonne 'id' sera la clé primaire et sera générée automatiquement
  @PrimaryGeneratedColumn()
  id: number;

  // La colonne 'title' pour stocker le titre de la tâche
  @Column()
  title: string;

  // La colonne 'description' pour stocker la description de la tâche
  @Column({ nullable: true })
  description: string;

  // La colonne 'status' pour stocker l'état de la tâche (par exemple : 'pending', 'completed', etc.)
  @Column({ default: 'pending' })
  status: string;

  // La colonne 'createdAt' pour stocker la date de création de la tâche
  @CreateDateColumn()
  createdAt: Date;

  // La colonne 'updatedAt' pour stocker la date de la dernière mise à jour de la tâche
  @UpdateDateColumn()
  updatedAt: Date;
}
