"use client"
import react from 'react';
import {testt} from '@/lib/types'

interface testprops{
    news:testt;
}
export default function Custo({news}:testprops) {
return (
    <div>
      <h2>{news.titles}</h2>
      <p>{news.text}</p>
    </div>
  );
}