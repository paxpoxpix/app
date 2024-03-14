
import { Request, Response } from 'express';
import { Character } from '../shared/types';

export async function getCharacters(db: any, req: Request, res: Response) {
  try {
    const characters = await db.all('SELECT * FROM characters');
    res.status(200).json(characters);
  } catch (error) {
    console.error('Error retrieving characters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

