import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import { Card, CardHeader, CardTitle, CardContent } from "../components/card";
import { Button } from "../components/button";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';

export default function Dashboard({ solicitudes = [] }) {
  const navigate = useNavigate();

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
    </div>
  );
}