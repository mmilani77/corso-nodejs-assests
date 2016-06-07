# Description

Questo modulo permette di inserire, aggiornare e interrogare gli assets presenti in un particolare oggetto

# Metodi

- insertAsset(type, description, state): inserisce un nuovo asset e restituisce un id univoco
- updateAsset(asset): aggiorna l'asset in base all'id dello stesso e alle nuove/aggiornate proprietà
- queryAsset(asset): interroga il db per recuperare quegli asset corrispondenti alle proprietà passate
