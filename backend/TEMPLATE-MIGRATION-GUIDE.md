# Template Migration Guide

## Converting from Old Syntax to Docxtemplater

Your existing template uses `##variable##` syntax. For docxtemplater, you need to change these to `{variable}`.

### Required Changes

#### Find and Replace (in Word):

1. Find: `##hukukNo##` → Replace: `{hukukNo}`
2. Find: `##bugunTarih##` → Replace: `{bugunTarih}`
3. Find: `##dosyaEsasNo##` → Replace: `{dosyaEsasNo}`
4. Find: `##asilAdi##` → Replace: `{asilAdi}`
5. Find: `##vekilAdi##` → Replace: `{vekilAdi}`
6. Find: `##kazaTarihi##` → Replace: `{kazaTarihi}`
7. Find: `##karsiAracPlaka##` → Replace: `{karsiAracPlaka}`
8. Find: `##sigortaliPlaka##` → Replace: `{sigortaliPlaka}`
9. Find: `##aracHasariTalep##` → Replace: `{aracHasariTalep}`
10. Find: `##degerKaybiTalep##` → Replace: `{degerKaybiTalep}`
11. Find: `##ekspertizTalep##` → Replace: `{ekspertizTalep}`
12. Find: `##policeBaslangic##` → Replace: `{policeBaslangic}`
13. Find: `##policeBitis##` → Replace: `{policeBitis}`
14. Find: `##gecenGunPolice##` → Replace: `{gecenGunPolice}`
15. Find: `##aracBasiTeminat##` → Replace: `{aracBasiTeminat}`
16. Find: `##kazaBasiTeminat##` → Replace: `{kazaBasiTeminat}`
17. Find: `##aracHasarOdemeTarih##` → Replace: `{aracHasarOdemeTarih}`
18. Find: `##aracHasarOdemeTutar##` → Replace: `{aracHasarOdemeTutar}`
19. Find: `##degerKaybiOdemeTutar##` → Replace: `{degerKaybiOdemeTutar}`
20. Find: `##bakiyeLimit##` → Replace: `{bakiyeLimit}`
21. Find: `##bagliHukukDosya##` → Replace: `{bagliHukukDosya}`

### Quick PowerShell Script for Bulk Replace

```powershell
# Save this as migrate-template.ps1
$variables = @(
    "hukukNo", "bugunTarih", "dosyaEsasNo", "asilAdi", "vekilAdi",
    "kazaTarihi", "karsiAracPlaka", "sigortaliPlaka", "aracHasariTalep",
    "degerKaybiTalep", "ekspertizTalep", "policeBaslangic", "policeBitis",
    "gecenGunPolice", "aracBasiTeminat", "kazaBasiTeminat", "aracHasarOdemeTarih",
    "aracHasarOdemeTutar", "degerKaybiOdemeTutar", "bakiyeLimit", "bagliHukukDosya"
)

# This will output the find/replace commands for Word
foreach ($var in $variables) {
    Write-Output "Find: ##$var## → Replace: {$var}"
}
```

### Adding Image Support

Add these placeholders where you want images to appear:

#### Company Logo

```
{companyLogo}
```

#### Signature

```
{signature}
```

#### Header Image

```
{headerImage}
```

### Manual Steps

1. **Open your template.docx** in Microsoft Word
2. **Use Find & Replace** (Ctrl+H) to replace each variable
3. **Add image placeholders** where appropriate
4. **Save the template** in the same location
5. **Test with the new system**

### Automated Migration

If you have many templates, you can use this Node.js script:

```javascript
const fs = require('fs');
const path = require('path');

// This is a conceptual script - Word docs need special handling
const migrateTemplate = (filePath) => {
  // You would need a library like officegen or docx to properly handle .docx files
  console.log(`Migrating ${filePath}...`);
  // Implementation would go here
};
```

### Testing Your Migrated Template

1. **Generate a test document**:

   ```bash
   curl -X POST http://localhost:3001/documents/generate/456 \
     -H "Content-Type: application/json" \
     -d '{}'
   ```

2. **Check the output** for proper variable replacement

3. **Verify images** are working if you added them

### Common Issues After Migration

1. **Variables not replaced**: Check spelling and syntax
2. **Images not showing**: Ensure files are in `backend/src/assets/`
3. **Formatting lost**: Word styles should be preserved
4. **Special characters**: Turkish characters should work fine

### Rollback Plan

Keep a backup of your original template in case you need to revert:

```bash
cp template.docx template-backup.docx
```
