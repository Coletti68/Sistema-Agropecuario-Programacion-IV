import React from 'react';
import '../styles/dashboard.css';


import { 
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Sprout,
  ShoppingCart
} from 'lucide-react';

//import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

// Mapeo de estados
const estadoConfig = {
  'Recibida': { color: 'bg-blue-500', icon: Clock },
  'En preparación': { color: 'bg-yellow-500', icon: Package },
  'Enviada': { color: 'bg-purple-500', icon: TrendingUp },
  'Entregada': { color: 'bg-green-500', icon: CheckCircle },
  'Rechazada': { color: 'bg-red-500', icon: XCircle }
};

export default function Dashboard({ solicitudes, cultivos, onNavigate }) {
  const estadisticas = {
    total: solicitudes.length,
    recibida: solicitudes.filter(s => s.estado === 'Recibida').length,
    enPreparacion: solicitudes.filter(s => s.estado === 'En preparación').length,
    enviada: solicitudes.filter(s => s.estado === 'Enviada').length,
    entregada: solicitudes.filter(s => s.estado === 'Entregada').length
  };

  const solicitudesRecientes = [...solicitudes]
    .sort((a, b) => b.fechaSolicitud.getTime() - a.fechaSolicitud.getTime())
    .slice(0, 3);

  return (
    <div className="dashboard-container">

      {/* HERO */}
      <Card className="dashboard-hero-card">
        <div className="dashboard-hero-img">
          <ImageWithFallback
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
                onClick={() => onNavigate('nueva-solicitud')}
                className="hero-button-primary"
              >
                <ShoppingCart className="icon" />
                Nueva Solicitud
              </Button>

              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('catalogo')}
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

      {/* CULTIVOS */}
      <Card>
        <CardHeader>
          <div className="card-header-flex">
            <div>
              <CardTitle>Mis Cultivos</CardTitle>
              <CardDescription>Resumen de tus cultivos actuales</CardDescription>
            </div>
            <Button variant="outline" onClick={() => onNavigate('cultivos')}>
              <Sprout className="icon" />
              Gestionar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {cultivos.length > 0 ? (
            <div className="cultivos-grid">
              {cultivos.map(cultivo => (
                <div key={cultivo.id} className="cultivo-item">
                  <div className="cultivo-header">
                    <Sprout className="icon-green" />
                    <h3>{cultivo.nombre}</h3>
                  </div>

                  <p className="text-muted-foreground">{cultivo.tipo}</p>
                  <p className="mt-2">{cultivo.hectareas} hectáreas</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="cultivos-empty">
              <Sprout className="icon-large" />
              <p className="text-muted-foreground mb-4">No hay cultivos registrados</p>
              <Button onClick={() => onNavigate('cultivos')}>
                Agregar primer cultivo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SOLICITUDES RECIENTES */}
      <Card>
        <CardHeader>
          <div className="card-header-flex">
            <div>
              <CardTitle>Solicitudes Recientes</CardTitle>
              <CardDescription>Últimas solicitudes realizadas</CardDescription>
            </div>
            <Button onClick={() => onNavigate('solicitudes')}>
              Ver todas
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="recientes-wrapper">
            {solicitudesRecientes.map(solicitud => {
              const config = estadoConfig[solicitud.estado];
              const Icon = config.icon;

              return (
                <div key={solicitud.id} className="solicitud-item">
                  <div className="flex-1">
                    <div className="solicitud-header">
                      <Icon className="icon" />
                      <span>Solicitud #{solicitud.id}</span>
                      <Badge variant="secondary">{solicitud.estado}</Badge>
                    </div>

                    <p className="solicitud-info">
                      {solicitud.items.length} insumo(s) -{' '}
                      {solicitud.fechaSolicitud.toLocaleDateString('es-AR')}
                    </p>
                  </div>

                  {solicitud.requiereRespuesta && (
                    <Badge variant="destructive">Requiere atención</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

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
              onClick={() => onNavigate('nueva-solicitud')}
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
