import dbConnect from '../../../lib/mongodb';
import Item from '@/models/Item';

export default async function handler(req, res) {
    const { method } = req;
  
    await dbConnect();
  
    switch (method) {
        