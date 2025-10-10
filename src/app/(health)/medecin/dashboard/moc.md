    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord Médecin</h1>
          <p className="text-muted-foreground">
            Bienvenue, Dr.  - Spécialité: {stats.specialite}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Activité
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Nouveau RDV
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="flex justify-between items-center gap-4">
      <QuickStats stats={stats} />
      <SpecialiteCard className="max-w-72" />
      </div>

      {/* Onglets principaux */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="rendez-vous">Rendez-vous</TabsTrigger>
        </TabsList>

        {/* Onglet Aperçu */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rendez-vous d'aujourd'hui */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Rendez-vous d'aujourd'hui
                </CardTitle>
                <CardDescription>Votre planning du jour</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rendezVousAujourdhui.map((rdv) => (
                    <div key={rdv.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{rdv.patient}</p>
                        <p className="text-sm text-muted-foreground">{rdv.motif}</p>
                      </div>
                      <Badge variant="outline">{rdv.heure}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patients récents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Patients récents
                </CardTitle>
                <CardDescription>Dernières consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientsRecents.map((patient) => (
                    <div key={patient.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {patient.prenom[0]}{patient.nom[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.prenom} {patient.nom}</p>
                          <p className="text-sm text-muted-foreground">{patient.maladie}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {patient.derniereVisite}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Widgets d'aide au diagnostic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Classification des maladies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Cardiologie</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Endocrinologie</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Autres</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Tendances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Nouveaux patients</span>
                    <span className="text-sm font-medium text-green-600">+12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">RDV cette semaine</span>
                    <span className="text-sm font-medium">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Statut
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Patients actifs</span>
                    <Badge variant="default">142</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">En attente</span>
                    <Badge variant="secondary">14</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Patients */}
        <TabsContent value="patients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes Patients</CardTitle>
              <CardDescription>
                Liste de tous vos patients avec leurs informations médicales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Maladie</TableHead>
                    <TableHead>Dernière visite</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientsRecents.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {patient.prenom[0]}{patient.nom[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.prenom} {patient.nom}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{patient.maladie}</Badge>
                      </TableCell>
                      <TableCell>{patient.derniereVisite}</TableCell>
                      <TableCell>
                        <Badge variant="default">Actif</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            Éditer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Rendez-vous */}
        <TabsContent value="rendez-vous" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes Rendez-vous</CardTitle>
              <CardDescription>
                Gestion de votre planning et des rendez-vous
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date/Heure</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rendezVousAujourdhui.map((rdv) => (
                    <TableRow key={rdv.id}>
                      <TableCell className="font-medium">{rdv.patient}</TableCell>
                      <TableCell>{rdv.heure}</TableCell>
                      <TableCell>{rdv.motif}</TableCell>
                      <TableCell>
                        <Badge variant="default">Confirmé</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm">
                            Annuler
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>