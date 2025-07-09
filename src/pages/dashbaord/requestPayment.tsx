import DashboardLayout from "../../components/layout/DashboardLayout";

const RequestPaymentPage = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center p-12 bg-white rounded-xl shadow-2xl">
      
          <div className="mb-8">
            <img 
              src="/logo.jpeg" 
              alt="Chapa Logo" 
              className="w-20 h-20 mx-auto mb-6 rounded-lg shadow-md"
            />
            
        
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Request Payment
            </h1>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Coming Soon!
            </h2>
       
            <p className="text-gray-600 text-lg leading-relaxed">
              This feature is currently under development. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  
  );
};

export default RequestPaymentPage;