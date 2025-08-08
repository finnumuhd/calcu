@@ .. @@
-import React, { useState } from 'react';
-import { Operator, ButtonType } from './types';
-import CalculatorButton from './components/CalculatorButton';
+import React, { useState } from 'react';
+import { Operator, ButtonType } from './types';
+import CalculatorButton from './components/CalculatorButton';
 
 const App: React.FC = () => {
     const [display, setDisplay] = useState<string>('0');
@@ .. @@
     return (
-        <div className="min-h-screen flex items-center justify-center p-4">
-            <div className="w-full max-w-sm mx-auto bg-black rounded-3xl p-6 shadow-2xl space-y-6">
-                <div className="text-right text-white font-light text-7xl p-4 break-words">
+        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-800">
+            <div className="w-full max-w-sm mx-auto bg-black rounded-3xl p-6 shadow-2xl">
+                <div className="text-right text-white font-light text-6xl p-4 min-h-[100px] flex items-center justify-end overflow-hidden">
                     {display}
                 </div>
 
-                <div className="grid grid-cols-4 gap-4">
+                <div className="grid grid-cols-4 gap-3 mt-4">
                     <CalculatorButton onClick={handleClearClick} label={display === '0' ? 'AC' : 'C'} type={ButtonType.Special} />
                     <CalculatorButton onClick={handleToggleSignClick} label="+/-" type={ButtonType.Special} />
                     <CalculatorButton onClick={handlePercentClick} label="%" type={ButtonType.Special} />