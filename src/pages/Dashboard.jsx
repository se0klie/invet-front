import { useAuth } from "../context/AuthContext"
export default function Dashboard() {
    const { user } = useAuth();
    return (
        <div>
            Bienvenido, {user.name}
        </div>
    );
}