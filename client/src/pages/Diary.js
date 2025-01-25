import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateUserForm from "../components/FormUpdateUser";
import TaskArea from "../components/TaskArea";
import "./styles/Diary.css";
import Swal from "sweetalert2";

function Diary() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [taskList, setTaskList] = useState([]); 

    // Obtener datos del usuario al cargar la página
    useEffect(() => {
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        if (username && userId) {
            setUserName(username);
            setUserId(userId);
        } else {
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/users/logout", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("userId");
                navigate("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout process", error);
        }
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleEditProfile = () => {
        setShowUpdateForm(true);
        setShowMenu(false);
    };

    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false);
    };

    const handleClearTasks = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            Swal.fire("Error", "No se puede identificar al usuario.", "error");
            return;
        }
    
        const confirmClear = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará todas tus tareas.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, limpiar",
            cancelButtonText: "Cancelar",
        });
    
        if (!confirmClear.isConfirmed) return;
    
        try {
            // Asegúrate de que la URL coincida con la ruta del backend
            const response = await fetch(`http://localhost:4000/api/activities/clear/${userId}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                await Swal.fire("Lista limpia", "Todas tus tareas se han eliminado.", "success");
                //window.location.reload();
                setTaskList([]); // Vaciar la lista de tareas en el estado
            } else {
                Swal.fire("Error", "Error al limpiar la lista de tareas.", "error");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            Swal.fire("Error", "Error al conectar con el servidor.", "error");
        }
        setShowMenu(false);
    };

    /*/const handleClearTasks = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("No se puede identificar al usuario.");
            return;
        }
    
        const confirmClear = window.confirm("¿Estás seguro de que deseas limpiar tu lista de tareas?");
        if (!confirmClear) return;
    
        try {
            const response = await fetch(`http://localhost:4000/api/activities/clear/${userId}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                alert("Tareas eliminadas exitosamente.");
                // Actualiza la pantalla para mostrar la lista vacía
                window.location.reload(); // Recarga para reflejar los cambios
            } else {
                console.error("Error al limpiar las tareas:", response.status);
                alert("Error al limpiar las tareas.");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };*/
    
    const handleDesableAccount = async () => {
        setShowMenu(false);
        const userId = localStorage.getItem("userId");
        if (!userId) {
            Swal.fire("Error", "No se puede identificar al usuario.", "error");
            return;
        }
    
        const confirmDesable = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción desactivará tu cuenta y no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, desactivar",
            cancelButtonText: "Cancelar",
        });
    
        if (!confirmDesable.isConfirmed) return;
    
        try {
            const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ active: false }),
            });
    
            if (response.ok) {
                await Swal.fire("Cuenta desactivada", "Tu cuenta se ha desactivado correctamente. Puedes activarla nuevamente desde la pantalla de acceso.", "success");
                // Limpia el estado del usuario y redirige al inicio de sesión
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("userId");
                navigate("/");
            } else {
                Swal.fire("Error", "Error al desactivar la cuenta.", "error");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            Swal.fire("Error", "Error al conectar con el servidor.", "error");
        }
    };

    return (
        <div>
            <header className="encabezado">
                <div className="user-info">
                    <span onClick={toggleMenu} className="user-name">
                        {userName}
                        <span className="dropdown-icon">▼</span>
                    </span>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <ul>
                                <li onClick={handleEditProfile}>Editar perfil</li>
                                <li onClick={handleClearTasks}>Limpiar lista de Tareas</li>
                                <li onClick={handleDesableAccount}>Desactivar cuenta</li>
                            </ul>
                        </div>
                    )}
                </div>
                <button className="boton-cs" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </header>
            <main>
                {showUpdateForm ? (
                    <UpdateUserForm userId={userId} onClose={handleCloseUpdateForm} />
                ) : (
                    <>
                        <h1>Bienvenido a tu agenda </h1>
                        <TaskArea taskList={taskList} setTaskList={setTaskList} />
                    </>
                )}
            </main>
            <footer className="ft-diary">
                AGENDAPP 2025 - Todos los derechos reservados.
            </footer>
        </div>
    );
}

export default Diary;
