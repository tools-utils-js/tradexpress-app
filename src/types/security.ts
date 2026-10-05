export interface WorkloadIdentityConfig {
  provider: 'aws' | 'gcp' | 'azure' | 'custom';
  serviceAccountEmail: string;
  allowedAudiences: string[];
  tokenExpirationSeconds?: number;
}

export interface NetworkSecurityConfig {
  allowedIps: string[];
  allowedDomains: string[];
  enforceMtls: boolean;
  trustedClientCertFingerprints?: string[];
}

export interface SecurityConfig {
  perimeterId: string;
  environment: 'development' | 'staging' | 'production';
  workloadIdentity: WorkloadIdentityConfig;
  network: NetworkSecurityConfig;
  strictMode: boolean;
}

export interface EvaluationContext {
  clientIp: string;
  originDomain: string;
  clientCertFingerprint?: string;
  identityToken?: string;
}
