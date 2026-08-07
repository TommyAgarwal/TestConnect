import React, { useState, useEffect } from 'react';
import SplitText from './SplitText';
import './EnrollmentForm.css';

const CaretLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#041E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CaretDownIcon = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L7 7L13 1" stroke="#6E6F72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const COUNTRIES = [
  { value: "Afghanistan", name: "Afghanistan" },
  { value: "Albania", name: "Albania" },
  { value: "Algeria", name: "Algeria" },
  { value: "Andorra", name: "Andorra" },
  { value: "Angola", name: "Angola" },
  { value: "Antigua&Deps", name: "Antigua & Deps" },
  { value: "Argentina", name: "Argentina" },
  { value: "Armenia", name: "Armenia" },
  { value: "Australia", name: "Australia" },
  { value: "Austria", name: "Austria" },
  { value: "Azerbaijan", name: "Azerbaijan" },
  { value: "Bahamas", name: "Bahamas" },
  { value: "Bahrain", name: "Bahrain" },
  { value: "Bangladesh", name: "Bangladesh" },
  { value: "Barbados", name: "Barbados" },
  { value: "Belarus", name: "Belarus" },
  { value: "Belgium", name: "Belgium" },
  { value: "Belize", name: "Belize" },
  { value: "Benin", name: "Benin" },
  { value: "Bermuda", name: "Bermuda" },
  { value: "Bhutan", name: "Bhutan" },
  { value: "Bolivia", name: "Bolivia" },
  { value: "BosniaHerzegovina", name: "Bosnia & Herzegovina" },
  { value: "Botswana", name: "Botswana" },
  { value: "Brazil", name: "Brazil" },
  { value: "Brunei", name: "Brunei" },
  { value: "Bulgaria", name: "Bulgaria" },
  { value: "Burkina", name: "Burkina" },
  { value: "Burundi", name: "Burundi" },
  { value: "Cambodia", name: "Cambodia" },
  { value: "Cameroon", name: "Cameroon" },
  { value: "Canada", name: "Canada" },
  { value: "CapeVerde", name: "Cape Verde" },
  { value: "CentralAfricanRep", name: "Central African Rep" },
  { value: "Chad", name: "Chad" },
  { value: "Chile", name: "Chile" },
  { value: "China", name: "China" },
  { value: "Colombia", name: "Colombia" },
  { value: "Comoros", name: "Comoros" },
  { value: "Congo", name: "Congo" },
  { value: "Congo(DemocraticRep)", name: "Congo (Democratic Rep)" },
  { value: "CostaRica", name: "Costa Rica" },
  { value: "Croatia", name: "Croatia" },
  { value: "Cuba", name: "Cuba" },
  { value: "Cyprus", name: "Cyprus" },
  { value: "CzechRepublic", name: "Czech Republic" },
  { value: "Denmark", name: "Denmark" },
  { value: "Djibouti", name: "Djibouti" },
  { value: "Dominica", name: "Dominica" },
  { value: "DominicanRepublic", name: "Dominican Republic" },
  { value: "EastTimor", name: "East Timor" },
  { value: "Ecuador", name: "Ecuador" },
  { value: "Egypt", name: "Egypt" },
  { value: "ElSalvador", name: "El Salvador" },
  { value: "EquatorialGuinea", name: "Equatorial Guinea" },
  { value: "Eritrea", name: "Eritrea" },
  { value: "Estonia", name: "Estonia" },
  { value: "Eswatini", name: "Eswatini" },
  { value: "Ethiopia", name: "Ethiopia" },
  { value: "Fiji", name: "Fiji" },
  { value: "Finland", name: "Finland" },
  { value: "France", name: "France" },
  { value: "Gabon", name: "Gabon" },
  { value: "Gambia", name: "Gambia" },
  { value: "Georgia", name: "Georgia" },
  { value: "Germany", name: "Germany" },
  { value: "Ghana", name: "Ghana" },
  { value: "Greece", name: "Greece" },
  { value: "Grenada", name: "Grenada" },
  { value: "Guatemala", name: "Guatemala" },
  { value: "Guinea", name: "Guinea" },
  { value: "Guinea-Bissau", name: "Guinea-Bissau" },
  { value: "Guyana", name: "Guyana" },
  { value: "Haiti", name: "Haiti" },
  { value: "Honduras", name: "Honduras" },
  { value: "Hungary", name: "Hungary" },
  { value: "Iceland", name: "Iceland" },
  { value: "India", name: "India" },
  { value: "Indonesia", name: "Indonesia" },
  { value: "Iran", name: "Iran" },
  { value: "Iraq", name: "Iraq" },
  { value: "Ireland(Republic)", name: "Ireland (Republic)" },
  { value: "Israel", name: "Israel" },
  { value: "Italy", name: "Italy" },
  { value: "IvoryCoast", name: "Ivory Coast" },
  { value: "Jamaica", name: "Jamaica" },
  { value: "Japan", name: "Japan" },
  { value: "Jordan", name: "Jordan" },
  { value: "Kazakhstan", name: "Kazakhstan" },
  { value: "Kenya", name: "Kenya" },
  { value: "Kiribati", name: "Kiribati" },
  { value: "KoreaNorth", name: "Korea North" },
  { value: "KoreaSouth", name: "Korea South" },
  { value: "Kosovo", name: "Kosovo" },
  { value: "Kuwait", name: "Kuwait" },
  { value: "Kyrgyzstan", name: "Kyrgyzstan" },
  { value: "Laos", name: "Laos" },
  { value: "Latvia", name: "Latvia" },
  { value: "Lebanon", name: "Lebanon" },
  { value: "Lesotho", name: "Lesotho" },
  { value: "Liberia", name: "Liberia" },
  { value: "Libya", name: "Libya" },
  { value: "Liechtenstein", name: "Liechtenstein" },
  { value: "Lithuania", name: "Lithuania" },
  { value: "Luxembourg", name: "Luxembourg" },
  { value: "Macedonia", name: "Macedonia" },
  { value: "Madagascar", name: "Madagascar" },
  { value: "Malawi", name: "Malawi" },
  { value: "Malaysia", name: "Malaysia" },
  { value: "Maldives", name: "Maldives" },
  { value: "Mali", name: "Mali" },
  { value: "Malta", name: "Malta" },
  { value: "MarshallIslands", name: "Marshall Islands" },
  { value: "Mauritania", name: "Mauritania" },
  { value: "Mauritius", name: "Mauritius" },
  { value: "Mexico", name: "Mexico" },
  { value: "Micronesia", name: "Micronesia" },
  { value: "Moldova", name: "Moldova" },
  { value: "Monaco", name: "Monaco" },
  { value: "Mongolia", name: "Mongolia" },
  { value: "Montenegro", name: "Montenegro" },
  { value: "Morocco", name: "Morocco" },
  { value: "Mozambique", name: "Mozambique" },
  { value: "Myanmar", name: "Myanmar" },
  { value: "Namibia", name: "Namibia" },
  { value: "Nauru", name: "Nauru" },
  { value: "Nepal", name: "Nepal" },
  { value: "Netherlands", name: "Netherlands" },
  { value: "NewZealand", name: "New Zealand" },
  { value: "Nicaragua", name: "Nicaragua" },
  { value: "Niger", name: "Niger" },
  { value: "Nigeria", name: "Nigeria" },
  { value: "Norway", name: "Norway" },
  { value: "Oman", name: "Oman" },
  { value: "Pakistan", name: "Pakistan" },
  { value: "Palau", name: "Palau" },
  { value: "Palestine", name: "Palestine" },
  { value: "Panama", name: "Panama" },
  { value: "PapuaNewGuinea", name: "Papua New Guinea" },
  { value: "Paraguay", name: "Paraguay" },
  { value: "Peru", name: "Peru" },
  { value: "Philippines", name: "Philippines" },
  { value: "Poland", name: "Poland" },
  { value: "Portugal", name: "Portugal" },
  { value: "Qatar", name: "Qatar" },
  { value: "Romania", name: "Romania" },
  { value: "Russia", name: "Russia" },
  { value: "Rwanda", name: "Rwanda" },
  { value: "StKitts&Nevis", name: "St Kitts & Nevis" },
  { value: "StLucia", name: "St Lucia" },
  { value: "SaintVincent&theGrenadines", name: "Saint Vincent & the Grenadines" },
  { value: "Samoa", name: "Samoa" },
  { value: "SanMarino", name: "San Marino" },
  { value: "SaoTome&Principe", name: "Sao Tome & Principe" },
  { value: "SaudiArabia", name: "Saudi Arabia" },
  { value: "Senegal", name: "Senegal" },
  { value: "Serbia", name: "Serbia" },
  { value: "Seychelles", name: "Seychelles" },
  { value: "SierraLeone", name: "Sierra Leone" },
  { value: "Singapore", name: "Singapore" },
  { value: "Slovakia", name: "Slovakia" },
  { value: "Slovenia", name: "Slovenia" },
  { value: "SolomonIslands", name: "Solomon Islands" },
  { value: "Somalia", name: "Somalia" },
  { value: "SouthAfrica", name: "South Africa" },
  { value: "SouthSudan", name: "South Sudan" },
  { value: "Spain", name: "Spain" },
  { value: "SriLanka", name: "Sri Lanka" },
  { value: "Sudan", name: "Sudan" },
  { value: "Suriname", name: "Suriname" },
  { value: "Sweden", name: "Sweden" },
  { value: "Switzerland", name: "Switzerland" },
  { value: "Syria", name: "Syria" },
  { value: "Taiwan", name: "Taiwan" },
  { value: "Tajikistan", name: "Tajikistan" },
  { value: "Tanzania", name: "Tanzania" },
  { value: "Thailand", name: "Thailand" },
  { value: "Togo", name: "Togo" },
  { value: "Tonga", name: "Tonga" },
  { value: "Trinidad&Tobago", name: "Trinidad & Tobago" },
  { value: "Tunisia", name: "Tunisia" },
  { value: "Turkey", name: "Turkey" },
  { value: "Turkmenistan", name: "Turkmenistan" },
  { value: "Tuvalu", name: "Tuvalu" },
  { value: "Uganda", name: "Uganda" },
  { value: "Ukraine", name: "Ukraine" },
  { value: "UnitedArabEmirates", name: "United Arab Emirates" },
  { value: "UnitedKingdom", name: "United Kingdom" },
  { value: "UnitedStates", name: "United States" },
  { value: "Uruguay", name: "Uruguay" },
  { value: "Uzbekistan", name: "Uzbekistan" },
  { value: "Vanuatu", name: "Vanuatu" },
  { value: "VaticanCity", name: "Vatican City" },
  { value: "Venezuela", name: "Venezuela" },
  { value: "Vietnam", name: "Vietnam" },
  { value: "Yemen", name: "Yemen" },
  { value: "Zambia", name: "Zambia" },
  { value: "Zimbabwe", name: "Zimbabwe" }
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export default function EnrollmentForm({ region, onBack, onSubmit, onFieldsChange, progress }) {
  const isUSA = region === 'USA';

  // Fields state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');

  // Touched state for onBlur validation
  const [touched, setTouched] = useState({});
  const [rawPhoneDigits, setRawPhoneDigits] = useState('');

  // Strict email regex validation
  const isEmailValid = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  // Validate individual field value
  const isFieldInvalid = (field, value) => {
    if (!touched[field]) return false; // Only flag after blur
    
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'fullName':
        return value.trim().length === 0;
      case 'email':
        return !isEmailValid(value);
      case 'phone':
        return rawPhoneDigits.length < 10;
      case 'zip':
        return value.trim().length < 5;
      case 'country':
      case 'birthMonth':
        return value.length === 0;
      default:
        return false;
    }
  };

  // Form validity (strict)
  const isFormValid = () => {
    if (isUSA) {
      return (
        firstName.trim().length > 0 &&
        lastName.trim().length > 0 &&
        isEmailValid(email) &&
        rawPhoneDigits.length === 10 &&
        zip.trim().length === 5 &&
        birthMonth !== ''
      );
    } else {
      return (
        fullName.trim().length > 0 &&
        isEmailValid(email) &&
        country.length > 0
      );
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Update parent on fields progress changes (USA has 6 fields, Intl has 3)
  useEffect(() => {
    let filledCount = 0;
    if (isUSA) {
      if (firstName.trim()) filledCount++;
      if (lastName.trim()) filledCount++;
      if (isEmailValid(email)) filledCount++;
      if (rawPhoneDigits.length === 10) filledCount++;
      if (zip.trim().length === 5) filledCount++;
      if (birthMonth !== '') filledCount++;
    } else {
      if (fullName.trim()) filledCount++;
      if (isEmailValid(email)) filledCount++;
      if (country) filledCount++;
    }
    onFieldsChange(filledCount);
  }, [firstName, lastName, email, rawPhoneDigits, zip, birthMonth, fullName, country, isUSA]);

  // Phone input formatting logic
  const handlePhoneInput = (e) => {
    const rawInput = e.target.value;
    const isDeleting = e.nativeEvent.inputType?.includes('delete') || false;
    
    let str = rawInput.trim();
    if (str.startsWith('+1')) {
      str = str.slice(2);
    } else if (str.startsWith('+')) {
      str = str.slice(1);
    }
    
    let digits = str.replace(/\D/g, '');
    if (digits.length === 11 && digits.startsWith('1')) {
      digits = digits.slice(1);
    }
    
    if (isDeleting && rawPhoneDigits && digits.length === rawPhoneDigits.length && digits.length > 0) {
      digits = digits.slice(0, -1);
    }
    
    digits = digits.slice(0, 10);
    setRawPhoneDigits(digits);
    
    let formatted = '';
    if (digits.length > 0) {
      formatted = '+1 ';
      if (digits.length < 3) {
        formatted += `(${digits}`;
      } else if (digits.length === 3) {
        formatted += `(${digits})`;
      } else if (digits.length <= 6) {
        formatted += `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        formatted += `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
    }
    setPhone(formatted);
  };

  // Zipcode filter
  const handleZipInput = (e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '').substring(0, 5);
    setZip(digits);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const data = isUSA 
      ? { firstName, lastName, email, phone, zip, birthMonth }
      : { fullName, email, country };
    
    onSubmit(data);
  };

  return (
    <div className="enrollment-screen screen-transition" data-node-id="1:61">
      {/* Header */}
      <div className="enrollment-header">
        <button className="back-button" onClick={onBack} aria-label="Go Back">
          <CaretLeftIcon />
        </button>
        <div className="progress-container">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="enrollment-form-container">
        <div className="enrollment-content">
          <div className="enrollment-header-text">
            <h1 className="enrollment-title">
              <SplitText text="Tell us about yourself" delay={100} />
            </h1>
            <p className="enrollment-subtitle reveal-in" style={{ '--delay': '200ms' }}>
              Enter your information to receive exclusive offers, early access to new arrivals, a birthday surprise, and more from Test Connect
            </p>
          </div>

          <div className="form-fields reveal-in" style={{ '--delay': '450ms' }}>
            {isUSA ? (
              <>
                <div className={`input-field-wrapper ${isFieldInvalid('firstName', firstName) ? 'error' : ''}`}>
                  <input 
                    type="text" 
                    placeholder="*First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    name="given-name"
                    autocomplete="given-name"
                    required
                  />
                </div>
                <div className={`input-field-wrapper ${isFieldInvalid('lastName', lastName) ? 'error' : ''}`}>
                  <input 
                    type="text" 
                    placeholder="*Last Name" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    name="family-name"
                    autocomplete="family-name"
                    required
                  />
                </div>
                <div className={`input-field-wrapper ${isFieldInvalid('email', email) ? 'error' : ''}`}>
                  <input 
                    type="email" 
                    placeholder="*Email Address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    name="email"
                    autocomplete="email"
                    required
                  />
                </div>
                <div className={`input-field-wrapper ${isFieldInvalid('phone', phone) ? 'error' : ''}`}>
                  <input 
                    type="tel" 
                    placeholder="*Phone Number" 
                    value={phone} 
                    onChange={handlePhoneInput}
                    onBlur={() => handleBlur('phone')}
                    name="tel"
                    autocomplete="tel"
                    required
                  />
                </div>
                <div className={`input-field-wrapper ${isFieldInvalid('zip', zip) ? 'error' : ''}`}>
                  <input 
                    type="text" 
                    placeholder="*Zipcode" 
                    value={zip} 
                    onChange={handleZipInput}
                    onBlur={() => handleBlur('zip')}
                    name="postal-code"
                    autocomplete="postal-code"
                    required
                  />
                </div>
                <div className={`select-field-wrapper ${isFieldInvalid('birthMonth', birthMonth) ? 'error' : ''}`}>
                  <select 
                    value={birthMonth} 
                    onChange={(e) => setBirthMonth(e.target.value)}
                    onBlur={() => handleBlur('birthMonth')}
                    name="bday-month"
                    autocomplete="bday-month"
                    required
                  >
                    <option value="" disabled>*Birth Month</option>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <div className="select-caret">
                    <CaretDownIcon />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={`input-field-wrapper ${isFieldInvalid('fullName', fullName) ? 'error' : ''}`}>
                  <input 
                    type="text" 
                    placeholder="*Full Name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    name="name"
                    autocomplete="name"
                    required
                  />
                </div>
                <div className={`input-field-wrapper ${isFieldInvalid('email', email) ? 'error' : ''}`}>
                  <input 
                    type="email" 
                    placeholder="*Email Address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    name="email"
                    autocomplete="email"
                    required
                  />
                </div>
                <div className={`select-field-wrapper ${isFieldInvalid('country', country) ? 'error' : ''}`}>
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    onBlur={() => handleBlur('country')}
                    name="country"
                    autocomplete="country-name"
                    required
                  >
                    <option value="" disabled>*Country</option>
                    {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                  </select>
                  <div className="select-caret">
                    <CaretDownIcon />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="enrollment-footer reveal-in" style={{ '--delay': '650ms' }}>
          <p className="disclaimer-text">
            This information will not be used or stored
          </p>
          <button 
            type="submit" 
            className={`btn-primary continue-button ${isFormValid() ? 'active' : 'disabled'}`}
            disabled={!isFormValid()}
          >
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
}
