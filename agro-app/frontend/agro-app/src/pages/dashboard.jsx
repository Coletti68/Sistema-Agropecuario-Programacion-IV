
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

export default function Dashboard({ solicitudes = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

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
                onClick={() => navigate('/productores')}
                className="hero-button-secondary"
              >
                Ver Catálogo
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

      {/* ACCIÓN RÁPIDA */}
      <Card className="accion-rapida-card">
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
      </Card>

      {/* SECCIÓN SOBRE NOSOTROS */}
      <div id="nosotros" className="about-us-section" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-100 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-stretch min-h-[500px]">
              <div className="flex-1 md:flex-[2] p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-emerald-50/50">
                <div className="flex items-center gap-3 mb-6">
                  <Info className="text-emerald-600" size={32} />
                  <h2 className="text-3xl font-bold text-emerald-900">Sobre Nosotros</h2>
                </div>
                <p className="text-lg text-emerald-800 leading-relaxed mb-6">
                  En <strong>AgroSistema</strong>, nos dedicamos a potenciar la producción agrícola mediante tecnología de vanguardia.
                  Nuestra misión es simplificar la gestión de cultivos y conectar a los productores con los mejores insumos del mercado.
                </p>
                <p className="text-emerald-700 font-medium mb-8">
                  Comprometidos con el desarrollo sostenible y la eficiencia del campo argentino.
                </p>

                <div className="space-y-4 text-emerald-800 bg-white p-6 rounded-xl border border-emerald-100 shadow-sm">
                  <p className="flex items-center gap-3">
                    <span className="font-semibold min-w-[80px] text-emerald-700">Dirección:</span>
                    <span>Av. Sarmiento 450, Goya-Corrientes, Argentina</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-semibold min-w-[80px] text-emerald-700">Teléfono:</span>
                    <span>+54 9 379 400-4972</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-semibold min-w-[80px] text-emerald-700">Email:</span>
                    <span>agrosistema@gmail.com</span>
                  </p>
                </div>
              </div>
              <div className="flex-1 md:flex-[3] relative min-h-[300px] md:min-h-full">
                <img
                  src="/about_us_agriculture_landscape.png"
                  alt="Agricultura Sostenible"
                  className="absolute inset-0 w-full h-full object-cover"
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
