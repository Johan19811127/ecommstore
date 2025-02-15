import Adminlayout from '@/components/admin/Layout';
import { useEffect, useState } from 'react';
import mongoose from 'mongoose';

import React from 'react'

export default function Suppliers() {
  return (
    <div>
        <Adminlayout>
            <div className="w-full p-3 border border-b-gray-300 bg-white ">
                <p className="text-md font-bold text-gray-900 text-center">Suppliers</p>
            </div>
        </Adminlayout>
    </div>
  )
}
