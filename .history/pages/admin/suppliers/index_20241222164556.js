import Adminlayout from '@/components/admin/Layout';
import { useEffect, useState } from 'react';
import mongoose from 'mongoose';

import React from 'react'

export default function Suppliers() {
  return (
    <div>
        <Adminlayout>
            <div className="w-full p-3 border border-b-gray-300 bg-white shadow-md ">
                <p className="text-md font-bold text-gray-900 text-center uppercase "> All Suppliers</p>
                <div className="flex flex-col items-center justify-center p-5">
                    <div className="bg-white rounded-md border border-gray-300 drop-shadow-md w-[80%"></div>
                </div>
            </div>
        </Adminlayout>
    </div>
  )
}
