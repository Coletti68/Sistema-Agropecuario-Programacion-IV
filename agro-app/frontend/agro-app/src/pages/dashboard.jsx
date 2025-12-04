import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/dashboard.css';
import { Card, CardHeader, CardTitle, CardContent } from "../components/card";
import { Button } from "../components/button";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  ShoppingCart,
  Info
} from 'lucide-react';
import { getSolicitudes } from '../services/api';
import Carousel from "../components/carousel";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [solicitudes, setSolicitudes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1740&auto=format&fit=crop",
      text: "Innovación tecnológica al servicio del campo argentino"
    },
    {
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
      text: "Conectando productores con los mejores insumos del mercado"
    },
    {
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1740&auto=format&fit=crop",
      text: "Eficiencia y sustentabilidad en cada cosecha"
    }
  ];

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const data = await getSolicitudes(token);
        setSolicitudes(data);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  useEffect(() => {
    if (location.hash === '#nosotros') {
      const element = document.getElementById('nosotros');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Estadísticas seguras
  const estadisticas = {
    total: solicitudes.length,
    recibida: solicitudes.filter(s => s.estado === 'Recibida').length,
    enPreparacion: solicitudes.filter(s => s.estado === 'En preparación').length,
    enviada: solicitudes.filter(s => s.estado === 'Enviada').length,
    entregada: solicitudes.filter(s => s.estado === 'Entregada').length
  };

  return (
    <div className="dashboard-container">
      {/* HERO */}
      <Card className="dashboard-hero-card">
        <div className="dashboard-hero-img">
          <img
            src="https://images.unsplash.com/photo-1730810618606-9a3f016d826d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Campo agrícola"
            className="dashboard-hero-background"
          />

          <div className="dashboard-hero-overlay" />

          <div className="dashboard-hero-content">
            <h1 className="dashboard-hero-title">¡Bienvenido al Portal de Productores!</h1>
            <p className="dashboard-hero-subtitle">
              Gestiona tus cultivos, solicitudes e insumos en un solo lugar
            </p>

            <div className="dashboard-hero-buttons">
              <Button
                size="lg"
                onClick={() => navigate('/solicitud/nueva')}
                className="hero-button-primary"
              >
                <ShoppingCart className="icon" />
                Nueva Solicitud
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/cultivos')}
                className="hero-button-secondary"
              >
                Ver Mis Cultivos
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* ESTADISTICAS */}
      <div className="dashboard-stats">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="stat-label">Total Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="stat-value">{estadisticas.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="stat-label">En Preparación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="stat-value text-yellow-600">{estadisticas.enPreparacion}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="stat-label">Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="stat-value text-purple-600">{estadisticas.enviada}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="stat-label">Entregadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="stat-value text-green-600">{estadisticas.entregada}</div>
          </CardContent>
        </Card>
      </div>

      {/* CARRUSEL DE IMÁGENES */}
      <Carousel items={carouselItems} />

      {/* ACCIÓN RÁPIDA (Comentada según estado anterior) */}
      {/* <Card className="accion-rapida-card">
        <CardContent className="pt-6">
          <div className="accion-rapida-flex">
            <div>
              <h3 className="accion-rapida-title">¿Necesitas insumos?</h3>
              <p className="accion-rapida-subtitle">
                Realiza una nueva solicitud fácilmente
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => navigate('/solicitud/nueva')}
              className="hero-button-primary"
            >
              Nueva Solicitud
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* SECCIÓN SOBRE NOSOTROS */}
      <div id="nosotros" className="about-us-section" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-100 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-stretch min-h-[500px]">
              <div className="flex-1 md:flex-[2] p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-emerald-50/50">
                <div className="flex items-center gap-3 mb-6">
                  <Info className="text-emerald-600" size={32} />
                  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-900 to-green-600 drop-shadow-sm">Sobre Nosotros</h2>
                </div>
                <p className="text-xl text-emerald-900/90 leading-loose mb-8 font-light">
                  En <strong className="font-bold text-emerald-800">AgroSistema</strong>, lideramos la transformación digital del campo argentino. Fusionamos la tradición agrícola con tecnología de vanguardia para maximizar el potencial de cada hectárea.
                  Nuestra plataforma integral no solo simplifica la gestión de tus cultivos, sino que crea un puente directo con los insumos de mayor calidad del mercado, garantizando excelencia en cada etapa de tu ciclo productivo.
                </p>
                <p className="text-lg text-emerald-700 font-medium mb-10 border-l-4 border-emerald-500 pl-4 italic">
                  "Impulsamos el futuro del agro con un compromiso inquebrantable hacia la innovación, la sostenibilidad y la eficiencia operativa."
                </p>

                <div className="space-y-5 text-emerald-800 bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <p className="flex items-center gap-4">
                    <span className="font-bold min-w-[90px] text-emerald-700 uppercase tracking-wide text-sm">Dirección:</span>
                    <span className="font-medium">Av. Sarmiento 450, Goya-Corrientes, Argentina</span>
                  </p>
                  <p className="flex items-center gap-4">
                    <span className="font-bold min-w-[90px] text-emerald-700 uppercase tracking-wide text-sm">Teléfono:</span>
                    <span className="font-medium">+54 9 379 400-4972</span>
                  </p>
                  <p className="flex items-center gap-4">
                    <span className="font-bold min-w-[90px] text-emerald-700 uppercase tracking-wide text-sm">Email:</span>
                    <span className="font-medium">agrosistema@gmail.com</span>
                  </p>
                </div>
              </div>
              <div className="about-us-image-container">
                <video
                  className="about-us-image"
                  id='front-video'
                  src="/about_us_agriculture_landscape_front_animation.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <video
                  className="about-us-image"
                  id='back-video'
                  src="/about_us_agriculture_landscape_back_animation.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
