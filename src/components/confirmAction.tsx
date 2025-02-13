interface ConfirmActionProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmAction = ({ onConfirm, onCancel }: ConfirmActionProps) => {
    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Título */}
            <h2 className="text-xl font-semibold text-gray-800">
                ¿Estás seguro?
            </h2>

            {/* Mensaje */}
            <p className="text-gray-600 text-center">
                Esta acción no se puede deshacer. ¿Deseas continuar?
            </p>

            {/* Botones */}
            <div className="flex justify-center space-x-4">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={onConfirm}
                >
                    Aceptar
                </button>
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default ConfirmAction;