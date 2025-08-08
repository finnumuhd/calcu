@@ .. @@
 const getButtonStyles = (type: ButtonType) => {
     switch (type) {
         case ButtonType.Operator:
-            return 'bg-orange-500 hover:bg-orange-600 text-white';
+            return 'bg-orange-500 hover:bg-orange-400 text-white';
         case ButtonType.Special:
-            return 'bg-gray-400 hover:bg-gray-500 text-black';
+            return 'bg-gray-500 hover:bg-gray-400 text-black';
         case ButtonType.Equals:
-             return 'bg-orange-500 hover:bg-orange-600 text-white col-span-2';
+             return 'bg-orange-500 hover:bg-orange-400 text-white';
         case ButtonType.Number:
         default:
-            return 'bg-gray-700 hover:bg-gray-600 text-white';
+            return 'bg-gray-800 hover:bg-gray-700 text-white';
     }
 }
 
 const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, label, type = ButtonType.Number, className = '' }) => {
-  const baseStyle = 'rounded-full text-3xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-colors duration-200';
+  const baseStyle = 'rounded-full text-3xl font-medium focus:outline-none transition-all duration-150 active:scale-95';
   const typeStyle = getButtonStyles(type);
 
   return (
     <button
       onClick={onClick}
-      className={`${baseStyle} ${typeStyle} ${className}`}
+      className={`${baseStyle} ${typeStyle} ${className} h-20`}
     >
       {label}
     </button>