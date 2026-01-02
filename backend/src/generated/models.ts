import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AnalysisResponse = {
  __typename?: 'AnalysisResponse';
  atsScore: Scalars['Float']['output'];
  confidence?: Maybe<Scalars['Float']['output']>;
  keywords: Array<Scalars['String']['output']>;
  strengths: Array<Scalars['String']['output']>;
  suggestions: Array<Scalars['String']['output']>;
};

export type AnalysisResult = {
  __typename?: 'AnalysisResult';
  analysisId: Scalars['ID']['output'];
  atsScore: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  keywords: Array<Scalars['String']['output']>;
  strengths: Array<Scalars['String']['output']>;
  suggestions: Array<Scalars['String']['output']>;
};

export type AnalyzeResumeInput = {
  jobDescription?: InputMaybe<Scalars['String']['input']>;
  resumeId: Scalars['ID']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: DataResponse;
};

export type CreateResumeInput = {
  file: Scalars['Upload']['input'];
  filename: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  analyzeResume: AnalysisResponse;
  deleteResume: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  register: AuthResponse;
  updateUser: User;
  uploadResume: Resume;
};


export type MutationAnalyzeResumeArgs = {
  analyzeResumeInput: AnalyzeResumeInput;
};


export type MutationDeleteResumeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginUserInput;
};


export type MutationRegisterArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};


export type MutationUploadResumeArgs = {
  createResumeInput: CreateResumeInput;
};

export type OAuthInfo = {
  __typename?: 'OAuthInfo';
  googleId?: Maybe<Scalars['String']['output']>;
  linkedInId?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser: User;
  getUserById?: Maybe<User>;
  getUsers: Array<User>;
  myResumes: Array<Resume>;
  resume?: Maybe<Resume>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResumeArgs = {
  id: Scalars['ID']['input'];
};

export type Resume = {
  __typename?: 'Resume';
  _id: Scalars['ID']['output'];
  analysisHistory: Array<AnalysisResult>;
  createdAt: Scalars['DateTime']['output'];
  filename: Scalars['String']['output'];
  rawText: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  userUpdated: User;
};


export type SubscriptionUserUpdatedArgs = {
  id: Scalars['ID']['input'];
};

export type SubscriptionInfo = {
  __typename?: 'SubscriptionInfo';
  customerId?: Maybe<Scalars['String']['output']>;
  renewalDate?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subscriptionId?: Maybe<Scalars['String']['output']>;
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  darkMode?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UsageInfo = {
  __typename?: 'UsageInfo';
  dailyScans?: Maybe<Scalars['Int']['output']>;
  lastScanDate?: Maybe<Scalars['String']['output']>;
  monthlyScans?: Maybe<Scalars['Int']['output']>;
  totalScans?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  avatarUrl?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  linkedInUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  oauth?: Maybe<OAuthInfo>;
  plan: Scalars['String']['output'];
  role: Scalars['String']['output'];
  settings?: Maybe<UserSettings>;
  subscription?: Maybe<SubscriptionInfo>;
  usage?: Maybe<UsageInfo>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  darkMode?: Maybe<Scalars['Boolean']['output']>;
  emailNotifications?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  notificationOnAnalysisComplete?: Maybe<Scalars['Boolean']['output']>;
};

export type DataResponse = {
  __typename?: 'dataResponse';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AnalysisResponse: ResolverTypeWrapper<AnalysisResponse>;
  AnalysisResult: ResolverTypeWrapper<AnalysisResult>;
  AnalyzeResumeInput: AnalyzeResumeInput;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateResumeInput: CreateResumeInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  OAuthInfo: ResolverTypeWrapper<OAuthInfo>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Resume: ResolverTypeWrapper<Resume>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SubscriptionInfo: ResolverTypeWrapper<SubscriptionInfo>;
  UpdateUserInput: UpdateUserInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  UsageInfo: ResolverTypeWrapper<UsageInfo>;
  User: ResolverTypeWrapper<User>;
  UserSettings: ResolverTypeWrapper<UserSettings>;
  dataResponse: ResolverTypeWrapper<DataResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AnalysisResponse: AnalysisResponse;
  AnalysisResult: AnalysisResult;
  AnalyzeResumeInput: AnalyzeResumeInput;
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean']['output'];
  CreateResumeInput: CreateResumeInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  LoginUserInput: LoginUserInput;
  Mutation: Record<PropertyKey, never>;
  OAuthInfo: OAuthInfo;
  Query: Record<PropertyKey, never>;
  Resume: Resume;
  String: Scalars['String']['output'];
  Subscription: Record<PropertyKey, never>;
  SubscriptionInfo: SubscriptionInfo;
  UpdateUserInput: UpdateUserInput;
  Upload: Scalars['Upload']['output'];
  UsageInfo: UsageInfo;
  User: User;
  UserSettings: UserSettings;
  dataResponse: DataResponse;
};

export type AnalysisResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalysisResponse'] = ResolversParentTypes['AnalysisResponse']> = {
  atsScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  confidence?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  keywords?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  strengths?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  suggestions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AnalysisResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalysisResult'] = ResolversParentTypes['AnalysisResult']> = {
  analysisId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  atsScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  keywords?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  strengths?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  suggestions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['dataResponse'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  analyzeResume?: Resolver<ResolversTypes['AnalysisResponse'], ParentType, ContextType, RequireFields<MutationAnalyzeResumeArgs, 'analyzeResumeInput'>>;
  deleteResume?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteResumeArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
  uploadResume?: Resolver<ResolversTypes['Resume'], ParentType, ContextType, RequireFields<MutationUploadResumeArgs, 'createResumeInput'>>;
};

export type OAuthInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['OAuthInfo'] = ResolversParentTypes['OAuthInfo']> = {
  googleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedInId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCurrentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  myResumes?: Resolver<Array<ResolversTypes['Resume']>, ParentType, ContextType>;
  resume?: Resolver<Maybe<ResolversTypes['Resume']>, ParentType, ContextType, RequireFields<QueryResumeArgs, 'id'>>;
};

export type ResumeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Resume'] = ResolversParentTypes['Resume']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  analysisHistory?: Resolver<Array<ResolversTypes['AnalysisResult']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rawText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  userUpdated?: SubscriptionResolver<ResolversTypes['User'], "userUpdated", ParentType, ContextType, RequireFields<SubscriptionUserUpdatedArgs, 'id'>>;
};

export type SubscriptionInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionInfo'] = ResolversParentTypes['SubscriptionInfo']> = {
  customerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  renewalDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subscriptionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UsageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsageInfo'] = ResolversParentTypes['UsageInfo']> = {
  dailyScans?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastScanDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  monthlyScans?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalScans?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  linkedInUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  oauth?: Resolver<Maybe<ResolversTypes['OAuthInfo']>, ParentType, ContextType>;
  plan?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType>;
  subscription?: Resolver<Maybe<ResolversTypes['SubscriptionInfo']>, ParentType, ContextType>;
  usage?: Resolver<Maybe<ResolversTypes['UsageInfo']>, ParentType, ContextType>;
};

export type UserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  darkMode?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  emailNotifications?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notificationOnAnalysisComplete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};

export type DataResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['dataResponse'] = ResolversParentTypes['dataResponse']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AnalysisResponse?: AnalysisResponseResolvers<ContextType>;
  AnalysisResult?: AnalysisResultResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  OAuthInfo?: OAuthInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Resume?: ResumeResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SubscriptionInfo?: SubscriptionInfoResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  UsageInfo?: UsageInfoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
  dataResponse?: DataResponseResolvers<ContextType>;
};

