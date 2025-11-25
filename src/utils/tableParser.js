/**
 * Parse pasted table data with partial success support
 * Returns all rows with error tracking for inline editing
 */

export function parseDeliveryData(pastedText) {
  if (!pastedText || typeof pastedText !== 'string') {
    return { 
      success: false, 
      error: "No data provided", 
      data: [],
      summary: { total: 0, valid: 0, invalid: 0 }
    };
  }

  const lines = pastedText.trim().split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    return { 
      success: false, 
      error: "Empty input", 
      data: [],
      summary: { total: 0, valid: 0, invalid: 0 }
    };
  }

  const parsed = [];
  let validCount = 0;

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const errors = [];
    
    // Try different separators
    let parts = line.split('\t').map(p => p.trim());
    if (parts.length < 6) {
      parts = line.split(',').map(p => p.trim());
    }
    if (parts.length < 6) {
      parts = line.split(/\s+/).map(p => p.trim());
    }

    // Check column count
    if (parts.length < 6) {
      errors.push(`Expected 6 columns, got ${parts.length}`);
      // Pad with empty strings to avoid crashes
      while (parts.length < 6) parts.push('');
    }

    const [lotNo, passDate, centre, qtlStr, bagsStr, moistureStr] = parts;

    // Validate lot number
    if (!lotNo || lotNo.trim() === '') {
      errors.push('Missing lot number');
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    let validDate = passDate;
    if (!dateRegex.test(passDate)) {
      errors.push('Invalid date format (use YYYY-MM-DD)');
      validDate = ''; // Clear invalid date
    }

    // Parse and validate numbers
    let qtl = parseFloat(qtlStr);
    if (isNaN(qtl) || qtl < 0) {
      errors.push('Invalid qtl value');
      qtl = 0;
    }

    let bags = parseInt(bagsStr);
    if (isNaN(bags) || bags < 0) {
      errors.push('Invalid bags quantity');
      bags = 0;
    }

    let moisture = parseFloat(moistureStr);
    if (isNaN(moisture) || moisture < 0) {
      errors.push('Invalid moisture cut');
      moisture = 0;
    }

    // Track if row is valid
    const isValid = errors.length === 0;
    if (isValid) validCount++;

    // Always add the row (even with errors)
    parsed.push({
      lineNumber: lineNum,
      rice_lot_no: lotNo,
      rice_pass_date: validDate,
      rice_deposit_centre: centre || '',
      qtl: qtl,
      rice_bags_quantity: bags,
      moisture_cut: moisture,
      errors: errors,
      isValid: isValid
    });
  });

  return {
    success: true,
    data: parsed,
    summary: {
      total: lines.length,
      valid: validCount,
      invalid: lines.length - validCount
    },
    allValid: validCount === lines.length
  };
}

// Helper to validate a single field (for real-time validation)
export function validateField(fieldName, value) {
  switch (fieldName) {
    case 'rice_lot_no':
      return value && value.trim() !== '' ? null : 'Missing lot number';
    
    case 'rice_pass_date':
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(value) ? null : 'Invalid date format (use YYYY-MM-DD)';
    
    case 'qtl':
    case 'rice_bags_quantity':
    case 'moisture_cut':
      const num = parseFloat(value);
      return !isNaN(num) && num >= 0 ? null : 'Must be a positive number';
    
    default:
      return null;
  }
}

// Re-validate all rows after edits
export function revalidateData(data) {
  let validCount = 0;
  
  const revalidated = data.map(row => {
    const errors = [];
    
    // Check each field
    const lotError = validateField('rice_lot_no', row.rice_lot_no);
    if (lotError) errors.push(lotError);
    
    const dateError = validateField('rice_pass_date', row.rice_pass_date);
    if (dateError) errors.push(dateError);
    
    const qtlError = validateField('qtl', row.qtl);
    if (qtlError) errors.push(qtlError);
    
    const bagsError = validateField('rice_bags_quantity', row.rice_bags_quantity);
    if (bagsError) errors.push(bagsError);
    
    const moistureError = validateField('moisture_cut', row.moisture_cut);
    if (moistureError) errors.push(moistureError);
    
    const isValid = errors.length === 0;
    if (isValid) validCount++;
    
    return {
      ...row,
      errors: errors,
      isValid: isValid
    };
  });
  
  return {
    data: revalidated,
    summary: {
      total: data.length,
      valid: validCount,
      invalid: data.length - validCount
    },
    allValid: validCount === data.length
  };
}
